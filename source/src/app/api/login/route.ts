// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../lib/prisma";

import bcrypt from "bcryptjs"; //za hasiranje lozinki

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Provjeri postoji li korisnik
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Korisnik ne postoji" },
      { status: 401 }
    );
  }

  const isValidPassword = bcrypt.compareSync(password, user.password);

  if (!isValidPassword) {
    return NextResponse.json(
      { success: false, message: "Pogrešna lozinka" },
      { status: 401 }
    );
  }

  // Ovdje možeš dodati session/token logiku ako želiš
  return NextResponse.json({ success: true, userId: user.id });
}
