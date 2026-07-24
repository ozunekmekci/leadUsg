import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createAdminToken, verifyPassword, AM_COOKIE_NAME } from "@/lib/auth";
import { logger, maskIP } from "@/lib/logger";

const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  password: z.string().min(1, "Şifre zorunludur."),
});

export async function POST(req: NextRequest) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : req.headers.get("x-real-ip") || "127.0.0.1";

    const body = await req.json();
    const parseResult = loginSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Geçersiz giriş verileri.", details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, password } = parseResult.data;

    // Find AM User in Database
    const amUser = await prisma.aMUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!amUser || !verifyPassword(password, amUser.passwordHash)) {
      logger.warn("Failed AM login attempt", { email, ip: maskIP(clientIp) });
      return NextResponse.json(
        { error: "Geçersiz e-posta veya şifre." },
        { status: 401 }
      );
    }

    // Create JWT Token
    const token = await createAdminToken({
      sub: amUser.id,
      email: amUser.email,
      name: amUser.name,
    });

    logger.info("Successful AM login", { userId: amUser.id, email: amUser.email, ip: maskIP(clientIp) });

    const response = NextResponse.json(
      { success: true, user: { id: amUser.id, email: amUser.email, name: amUser.name } },
      { status: 200 }
    );

    // Set HTTP-Only Cookie
    response.cookies.set(AM_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    logger.error("Error processing AM login", { error: String(error) });
    return NextResponse.json({ error: "Sunucu hatası oluştu." }, { status: 500 });
  }
}
