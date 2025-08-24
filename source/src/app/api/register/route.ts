import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/../lib/prisma";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json(
      { success: false, message: "Korisnik već postoji" },
      { status: 409 }
    );
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ success: true });
}
