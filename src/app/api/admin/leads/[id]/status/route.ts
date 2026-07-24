import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  new: ["called", "closed"],
  called: ["warm", "cold", "closed"],
  warm: ["sold", "cold", "closed"],
  cold: ["warm", "closed"],
  sold: ["closed"],
  closed: ["new", "called"],
};

const statusUpdateSchema = z.object({
  status: z.enum(["new", "called", "warm", "cold", "sold", "closed"]),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const leadId = params.id;
    const body = await req.json();
    const parseResult = statusUpdateSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Geçersiz statü değeri.", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { status: targetStatus } = parseResult.data;

    // Fetch existing lead
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead kaydı bulunamadı." }, { status: 404 });
    }

    const currentStatus = lead.status;

    // Check same status request
    if (currentStatus === targetStatus) {
      return NextResponse.json({ success: true, lead }, { status: 200 });
    }

    // Validate State Machine Transition Rule
    const allowedNextStates = ALLOWED_TRANSITIONS[currentStatus] || [];
    if (!allowedNextStates.includes(targetStatus)) {
      logger.warn("Invalid AM state transition attempted", {
        leadId,
        currentStatus,
        targetStatus,
        allowedNextStates,
      });

      return NextResponse.json(
        {
          error: `Geçersiz statü geçişi. '${currentStatus}' durumundaki bir lead direkt '${targetStatus}' durumuna geçirilemez.`,
          currentStatus,
          targetStatus,
          allowedNextStates,
        },
        { status: 400 }
      );
    }

    // Apply Valid Status Transition
    const updatedLead = await prisma.lead.update({
      where: { id: leadId },
      data: {
        status: targetStatus,
        updatedAt: new Date(),
      },
    });

    logger.info("AM State Transition successful", {
      leadId,
      fromStatus: currentStatus,
      toStatus: targetStatus,
    });

    return NextResponse.json({ success: true, lead: updatedLead }, { status: 200 });
  } catch (error) {
    logger.error("Error updating lead status", { error: String(error) });
    return NextResponse.json({ error: "Sunucu hatası oluştu." }, { status: 500 });
  }
}
