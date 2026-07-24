import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";

export const dynamic = "force-dynamic";

export async function GET() {
  const health = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: {
      postgres: "down",
      redis: "down",
    },
  };

  // Check PostgreSQL
  try {
    await prisma.$queryRaw`SELECT 1`;
    health.services.postgres = "up";
  } catch {
    health.services.postgres = "down";
    health.status = "degraded";
  }

  // Check Redis
  try {
    const redisPong = await redis.ping();
    if (redisPong === "PONG") {
      health.services.redis = "up";
    } else {
      health.services.redis = "degraded";
    }
  } catch {
    health.services.redis = "down";
    // If Redis is down, overall system is degraded
    health.status = "degraded";
  }

  const statusCode = health.status === "ok" ? 200 : 503;

  return NextResponse.json(health, { status: statusCode });
}
