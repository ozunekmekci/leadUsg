import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(requestUrl(req));
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const whereClause: Record<string, unknown> = {};

    if (status && status !== "all") {
      whereClause.status = status;
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ];
    }

    const leads = await prisma.lead.findMany({
      where: whereClause,
      include: {
        session: {
          select: {
            consentStatus: true,
            createdAt: true,
            ipHash: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, leads }, { status: 200 });
  } catch (error) {
    console.error("Error fetching leads list:", error);
    return NextResponse.json({ error: "Lead verileri alınamadı." }, { status: 500 });
  }
}

function requestUrl(req: NextRequest): string {
  return req.url || "http://localhost:3000/api/admin/leads";
}
