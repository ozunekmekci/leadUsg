import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const leadId = params.id;

    // 1. Fetch Lead record with associated Session and Notes
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: {
        session: true,
        notes: {
          include: {
            amUser: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead kaydı bulunamadı." }, { status: 404 });
    }

    // 2. Gather All Associated Session IDs (Unified Sessions via Fingerprint)
    const sessionIdsSet = new Set<string>();
    if (lead.sessionId) {
      sessionIdsSet.add(lead.sessionId);
    }

    if (lead.session?.fingerprintHash && lead.session.consentStatus !== "none") {
      const mergedSessions = await prisma.session.findMany({
        where: { fingerprintHash: lead.session.fingerprintHash },
        select: { id: true },
      });
      mergedSessions.forEach((s) => sessionIdsSet.add(s.id));
    }

    const sessionIds = Array.from(sessionIdsSet);

    // 3. Fetch All Events Across Associated Sessions
    const events = await prisma.event.findMany({
      where: {
        sessionId: {
          in: sessionIds,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // 4. Resolve Product IDs in Event Metadata to Product Names
    const productIdSet = new Set<number>();

    events.forEach((evt) => {
      const meta = evt.metadata as Record<string, unknown> | null;
      if (!meta) return;

      if (Array.isArray(meta.productIds)) {
        meta.productIds.forEach((pid) => {
          const num = Number(pid);
          if (!isNaN(num)) productIdSet.add(num);
        });
      }
      if (meta.productId) {
        const num = Number(meta.productId);
        if (!isNaN(num)) productIdSet.add(num);
      }
    });

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: Array.from(productIdSet),
        },
      },
      select: {
        id: true,
        slug: true,
        name: true,
        brand: true,
        category: true,
      },
    });

    const productMap: Record<number, { id: number; slug: string; name: string; brand: string; fullName: string }> = {};
    products.forEach((p) => {
      productMap[p.id] = {
        ...p,
        fullName: `${p.brand} ${p.name}`,
      };
    });

    // 5. Compute Behavioral Intelligence Metrics
    let firstVisitDate = lead.createdAt;
    let lastVisitDate = lead.createdAt;
    const comparedProductsSet = new Set<string>();

    if (events.length > 0) {
      const sortedTimestamps = events
        .map((e) => new Date(e.createdAt).getTime())
        .sort((a, b) => a - b);

      firstVisitDate = new Date(sortedTimestamps[0]);
      lastVisitDate = new Date(sortedTimestamps[sortedTimestamps.length - 1]);

      events.forEach((e) => {
        const meta = e.metadata as Record<string, unknown> | null;
        if (!meta) return;

        if (e.eventName === "compare_start" || e.eventName === "compare_toggle") {
          if (Array.isArray(meta.productIds)) {
            meta.productIds.forEach((pid) => {
              const num = Number(pid);
              if (productMap[num]) {
                comparedProductsSet.add(productMap[num].fullName);
              }
            });
          }
          if (meta.productName && typeof meta.productName === "string") {
            comparedProductsSet.add(meta.productName);
          }
        }
      });
    }

    const activeDaysSpan = Math.max(
      1,
      Math.ceil((lastVisitDate.getTime() - firstVisitDate.getTime()) / (1000 * 60 * 60 * 24))
    );

    const metrics = {
      totalEvents: events.length,
      sessionCount: sessionIds.length,
      comparedProducts: Array.from(comparedProductsSet),
      firstVisitDate: firstVisitDate.toISOString(),
      lastVisitDate: lastVisitDate.toISOString(),
      activeDaysSpan,
      consentStatus: lead.session?.consentStatus || "full",
    };

    logger.info("Fetched unified lead details", {
      leadId,
      sessionCount: sessionIds.length,
      eventsCount: events.length,
    });

    return NextResponse.json(
      {
        success: true,
        lead,
        events,
        notes: lead.notes,
        productMap,
        metrics,
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Error fetching lead detail", { error: String(error) });
    return NextResponse.json({ error: "Lead detayları alınamadı." }, { status: 500 });
  }
}
