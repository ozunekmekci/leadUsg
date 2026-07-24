import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { logger, maskIP, maskPII } from "@/lib/logger";

const phoneRegex = /^(\+?90|0)?[5][0-9]{9}$/;

// Server-side Lead Validation Schema
const serverLeadSchema = z.object({
  name: z.string().min(2, "Ad soyad en az 2 karakter olmalıdır."),
  company: z.string().min(2, "Kurum adı en az 2 karakter olmalıdır."),
  phone: z
    .string()
    .transform((val) => val.replace(/\s+/g, ""))
    .refine((val) => phoneRegex.test(val), {
      message: "Geçersiz telefon numarası formatı.",
    }),
  email: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : val))
    .refine((val) => val === null || val === undefined || z.string().email().safeParse(val).success, {
      message: "Geçersiz e-posta formatı.",
    }),
  budgetRange: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  sessionId: z.string().optional().nullable(),
  selectedProducts: z.array(z.string()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Extract Client IP
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : req.headers.get("x-real-ip") || "127.0.0.1";

    // 2. Redis Anti-Spam Rate Limit (Max 3 submissions / minute per IP)
    const rateLimitKey = `ratelimit:leads:${clientIp}`;
    try {
      const currentCount = await redis.incr(rateLimitKey);
      if (currentCount === 1) {
        await redis.expire(rateLimitKey, 60);
      }
      if (currentCount > 3) {
        logger.warn("Anti-spam rate limit triggered for /api/leads", { ip: clientIp });
        return NextResponse.json(
          { error: "Çok fazla teklif talebi gönderdiniz. Lütfen bir süre sonra tekrar deneyiniz." },
          { status: 429 }
        );
      }
    } catch (redisErr) {
      logger.warn("Redis rate limit bypass due to connection issue", { error: String(redisErr) });
    }

    // 3. Body Parsing & Server Validation
    const body = await req.json();
    const parseResult = serverLeadSchema.safeParse(body);

    if (!parseResult.success) {
      logger.warn("Server validation failed for /api/leads", { errors: parseResult.error.flatten() });
      return NextResponse.json(
        {
          error: "Geçersiz form verisi.",
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, company, phone, email, budgetRange, message, sessionId, selectedProducts } = parseResult.data;

    // 4. Session Association & Consent Status Upgrade to "full"
    let targetSessionId = sessionId;
    if (!targetSessionId) {
      targetSessionId = `sess_lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    }

    const hashedIp = maskPII(clientIp);

    const session = await prisma.session.upsert({
      where: { id: targetSessionId },
      update: {
        consentStatus: "full",
        ipHash: hashedIp,
        updatedAt: new Date(),
      },
      create: {
        id: targetSessionId,
        consentStatus: "full",
        ipHash: hashedIp,
      },
    });

    // 5. Upsert Lead (Prevent Duplicate Lead for Same Session)
    let leadRecord;
    const existingLead = await prisma.lead.findFirst({
      where: { sessionId: session.id },
    });

    if (existingLead) {
      leadRecord = await prisma.lead.update({
        where: { id: existingLead.id },
        data: {
          name,
          company,
          phone,
          email: email || null,
          budgetRange: budgetRange || null,
          message: message || null,
          status: "new",
          updatedAt: new Date(),
        },
      });
      logger.info("Updated existing lead record for session", {
        leadId: leadRecord.id,
        sessionId: maskPII(session.id),
      });
    } else {
      leadRecord = await prisma.lead.create({
        data: {
          name,
          company,
          phone,
          email: email || null,
          budgetRange: budgetRange || null,
          message: message || null,
          sessionId: session.id,
          status: "new",
        },
      });
      logger.info("Created new lead record", {
        leadId: leadRecord.id,
        sessionId: maskPII(session.id),
      });
    }

    // 6. AM Notification Dispatcher
    dispatchAMNotification({
      leadId: leadRecord.id,
      name,
      company,
      phone,
      email: email || undefined,
      budgetRange: budgetRange || undefined,
      selectedProducts,
      ip: clientIp,
    });

    return NextResponse.json(
      {
        success: true,
        leadId: leadRecord.id,
        message: "Teklif talebiniz başarıyla alındı.",
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Internal error processing lead submission", { error: String(error) });
    return NextResponse.json({ error: "Sunucu hatası oluştu." }, { status: 500 });
  }
}

interface AMNotificationPayload {
  leadId: string;
  name: string;
  company: string;
  phone: string;
  email?: string;
  budgetRange?: string;
  selectedProducts?: string[];
  ip: string;
}

function dispatchAMNotification(payload: AMNotificationPayload) {
  logger.info("📢 AM ALERT: New Lead Received for Account Manager", {
    leadId: payload.leadId,
    company: payload.company,
    budgetRange: payload.budgetRange || "Belirtilmedi",
    productsCount: payload.selectedProducts?.length || 0,
    ip: maskIP(payload.ip),
  });

  const webhookUrl = process.env.AM_WEBHOOK_URL;
  if (webhookUrl) {
    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "lead_received",
        timestamp: new Date().toISOString(),
        data: payload,
      }),
    }).catch((err) => {
      logger.warn("Failed to dispatch AM webhook notification", { error: String(err) });
    });
  }
}
