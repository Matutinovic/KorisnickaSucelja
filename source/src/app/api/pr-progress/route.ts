import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    const trainingId = req.nextUrl.searchParams.get("trainingId"); // Novo: filter po treningu.
    const exerciseName = req.nextUrl.searchParams.get("exerciseName");

    if (!userId || !exerciseName || !trainingId) {
      return NextResponse.json(
        {
          success: false,
          message: "Nedostaju userId, trainingId ili exerciseName",
        },
        { status: 400 }
      );
    }

    const exercises = await prisma.exerciseEntry.findMany({
      where: {
        name: exerciseName,
        trainingId: +trainingId, // Novo: filtriraj po trainingId.
        training: {
          userId: +userId, // Osiguraj da je korisnikov trening. ne triba
        },
      },
      select: {
        weight: true,
        reps: true,
        week: {
          select: {
            number: true,
          },
        },
      },
      orderBy: {
        week: {
          number: "asc",
        },
      },
    });

    const formattedExercises = exercises.map((ex) => ({
      weight: ex.weight,
      reps: ex.reps,
      weekNumber: ex.week.number,
    }));

    return NextResponse.json({ success: true, exercises: formattedExercises });
  } catch (error) {
    console.error("Greška pri dohvatanju PR podataka:", error);
    return NextResponse.json(
      { success: false, message: "Greška na serveru" },
      { status: 500 }
    );
  }
}
