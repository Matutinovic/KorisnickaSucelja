import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST: Dodavanje nove vježbe
export async function POST(req: NextRequest) {
  try {
    const { trainingId, weekId, name, sets, reps, weight } = await req.json();

    if (
      !trainingId ||
      !weekId ||
      !name ||
      !sets ||
      !reps ||
      weight === undefined
    ) {
      return NextResponse.json(
        { success: false, message: "Svi podaci su obavezni" },
        { status: 400 }
      );
    }

    console.log("POST exerciseEntry payload:", { trainingId, weekId, name, sets, reps, weight });

    const exerciseEntry = await prisma.exerciseEntry.create({
      data: {
        trainingId,
        weekId,
        name,
        sets,
        reps,
        weight: parseFloat(weight),
      },
    });

    return NextResponse.json({ success: true, exerciseEntry });
  } catch (error) {
    console.error("Greška pri dodavanju vježbe:", error);
    return NextResponse.json(
      { success: false, message: "Greška na serveru" },
      { status: 500 }
    );
  }
}

// GET: Dohvati vježbe za određeni tjedan
export async function GET(req: NextRequest) {
  try {
    const weekId = req.nextUrl.searchParams.get("weekId");
    if (!weekId) {
      return NextResponse.json(
        { success: false, message: "weekId je obavezan" },
        { status: 400 }
      );
    }

    const exercises = await prisma.exerciseEntry.findMany({
      where: { weekId },
    });

    return NextResponse.json({ success: true, exercises });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Greška na serveru" },
      { status: 500 }
    );
  }
}
