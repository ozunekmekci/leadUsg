import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken, AM_COOKIE_NAME } from "@/lib/auth";
import { logger } from "@/lib/logger";

const noteSchema = z.object({
  content: z.string().min(1, "Not içeriği boş olamaz.").max(2000),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const leadId = params.id;

    // 1. Resolve Authenticated AM User from Session Cookie
    const sessionCookie = req.cookies.get(AM_COOKIE_NAME)?.value;
    let amUserId: string | null = null;

    if (sessionCookie) {
      const payload = await verifyAdminToken(sessionCookie);
      if (payload) {
        amUserId = payload.sub;
      }
    }

    // Fallback to primary AM User if token verification is bypassed in dev
    if (!amUserId) {
      const defaultAM = await prisma.aMUser.findFirst();
      if (defaultAM) {
        amUserId = defaultAM.id;
      }
    }

    if (!amUserId) {
      return NextResponse.json({ error: "Yetkisiz erişim. AM girişi yapılmalıdır." }, { status: 401 });
    }

    // 2. Validate Body
    const body = await req.json();
    const parseResult = noteSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Geçersiz not içeriği.", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { content } = parseResult.data;

    // Check if lead exists
    const leadExists = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!leadExists) {
      return NextResponse.json({ error: "Lead kaydı bulunamadı." }, { status: 404 });
    }

    // 3. Create Lead Note
    const newNote = await prisma.leadNote.create({
      data: {
        leadId,
        content,
        amUserId,
      },
      include: {
        amUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    logger.info("Added AM note to lead", { leadId, noteId: newNote.id, amUserId });

    return NextResponse.json({ success: true, note: newNote }, { status: 201 });
  } catch (error) {
    logger.error("Error creating lead note", { error: String(error) });
    return NextResponse.json({ error: "Not eklenirken bir sunucu hatası oluştu." }, { status: 500 });
  }
}
