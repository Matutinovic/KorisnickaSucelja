import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const userId = Number(req.nextUrl.searchParams.get("userId"));

    if (!userId) {
      return NextResponse.json({ trainings: [] });
    }

    const trainings = await prisma.training.findMany({
      where: { userId },
      select: { id: true, name: true },
    });

    return NextResponse.json({ trainings });
  } catch (error) {
    console.error("Greška pri dohvaćanju treninga:", error);
    return NextResponse.json(
      { trainings: [], success: false, message: error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, userId } = await req.json();

    if (!name || !userId) {
      return NextResponse.json(
        { success: false, message: "Nedostaju podaci" },
        { status: 400 }
      );
    }

    const newTraining = await prisma.training.create({
      data: {
        name,
        userId: +userId,
      },
    });

    return NextResponse.json({
      success: true,
      training: { id: newTraining.id, name: newTraining.name },
    });
  } catch (error) {
    console.error("Greška pri kreiranju treninga:", error);
    return NextResponse.json(
      { success: false, message: "Greška na serveru" },
      { status: 500 }
    );
  }
}
