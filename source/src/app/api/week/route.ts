import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST: Dodavanje tjedna
export async function POST(req: NextRequest) {
  try {
    const { trainingId, number } = await req.json();

    if (!trainingId || !number) {
      return NextResponse.json(
        { success: false, message: "trainingId i broj su obavezni" },
        { status: 400 }
      );
    }

    const week = await prisma.week.create({
      data: {
        number,
        trainings: {
          create: {
            trainingId,
          },
        },
      },
    });

    return NextResponse.json({ success: true, week });
  } catch (error) {
    console.error("Greška pri dodavanju tjedna:", error);
    return NextResponse.json(
      { success: false, message: "Greška na serveru" },
      { status: 500 }
    );
  }
}

// GET: Dohvati sve tjedne za jedan trening
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const trainingId = searchParams.get("trainingId");

    if (!trainingId) {
      return NextResponse.json(
        { success: false, message: "trainingId je obavezan" },
        { status: 400 }
      );
    }

    const weeks = await prisma.trainingOnWeek.findMany({
      where: { trainingId },
      include: { week: true },
    });

    const extractedWeeks = weeks.map((tw) => tw.week);

    return NextResponse.json({ success: true, weeks: extractedWeeks });
  } catch (error) {
    console.error("Greška pri dohvaćanju tjedana:", error);
    return NextResponse.json(
      { success: false, message: "Greška na serveru" },
      { status: 500 }
    );
  }
}
