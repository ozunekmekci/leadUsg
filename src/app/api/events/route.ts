import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { logger, maskIP, maskPII } from "@/lib/logger";

// Request Body Validation Schema
const eventItemSchema = z.object({
  eventName: z.string().min(1).max(100),
  metadata: z.record(z.string(), z.unknown()).optional(),
  timestamp: z.string().optional(),
});

const eventsBatchSchema = z.object({
  sessionId: z.string().min(1),
  fingerprintHash: z.string().nullable().optional(),
  consentStatus: z.enum(["analytics", "full"]),
  events: z.array(eventItemSchema).min(1).max(100),
});

export async function POST(req: NextRequest) {
  try {
    // Extract Client IP
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : req.headers.get("x-real-ip") || "127.0.0.1";

    // 1. Redis Rate Limiting (60 requests / minute per IP)
    const rateLimitKey = `ratelimit:events:${clientIp}`;
    try {
      const currentCount = await redis.incr(rateLimitKey);
      if (currentCount === 1) {
        await redis.expire(rateLimitKey, 60);
      }
      if (currentCount > 60) {
        logger.warn("Rate limit exceeded for events endpoint", { ip: clientIp });
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 }
        );
      }
    } catch (redisErr) {
      // Graceful fallback if Redis is unavailable
      logger.warn("Redis connection failed during rate limit check", { error: String(redisErr) });
    }

    // 2. Body Parsing & Zod Validation
    const body = await req.json();
    const parseResult = eventsBatchSchema.safeParse(body);

    if (!parseResult.success) {
      logger.warn("Invalid /api/events payload", { errors: parseResult.error.flatten() });
      return NextResponse.json(
        { error: "Invalid payload format", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { sessionId, fingerprintHash, consentStatus, events } = parseResult.data;

    // STRICT CHECK: Reject if consentStatus is not analytics/full
    if (consentStatus !== "analytics" && consentStatus !== "full") {
      logger.warn("Attempted event submission without valid consent", { consentStatus });
      return NextResponse.json(
        { error: "Consent required for event tracking" },
        { status: 403 }
      );
    }

    const hashedIp = maskPII(clientIp);

    // 3. Upsert Session Record
    await prisma.session.upsert({
      where: { id: sessionId },
      update: {
        consentStatus,
        fingerprintHash: fingerprintHash || undefined,
        ipHash: hashedIp,
        updatedAt: new Date(),
      },
      create: {
        id: sessionId,
        consentStatus,
        fingerprintHash: fingerprintHash || null,
        ipHash: hashedIp,
      },
    });

    // 4. Batch Insert Events into DB
    const eventRecords = events.map((evt) => ({
      sessionId,
      eventName: evt.eventName,
      metadata: (evt.metadata || {}) as object,
      createdAt: evt.timestamp ? new Date(evt.timestamp) : new Date(),
    }));

    await prisma.event.createMany({
      data: eventRecords,
    });

    logger.info("Successfully recorded batch events", {
      sessionId: maskPII(sessionId),
      count: events.length,
      consentStatus,
      ip: maskIP(clientIp),
    });

    return NextResponse.json({ success: true, count: events.length }, { status: 200 });
  } catch (error) {
    logger.error("Error processing /api/events request", { error: String(error) });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
