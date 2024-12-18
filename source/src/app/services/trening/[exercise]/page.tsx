import fs from "fs";
import path from "path";
import Link from "next/link";

type Exercise = {
  id: string;
  name: string;
  bodyPart: string;
  target: string;
  equipment: string;
  gifUrl: string;
};

type ExerciseDetailsProps = {
  params: { exercise: string };
};

// Function to fetch all exercises from the local JSON file
async function getExercises(): Promise<Exercise[]> {
  const filePath = path.join(process.cwd(), "src", "data", "exercises.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData) as Exercise[];
}

// Function to get an exercise by ID
async function getExerciseById(id: string): Promise<Exercise | undefined> {
  const exercises = await getExercises();
  return exercises.find((exercise) => String(exercise.id) === id);
}

export default async function ExerciseDetails({
  params,
}: ExerciseDetailsProps) {
  const exercise = await getExerciseById(params.exercise);

  if (!exercise) {
    return (
      <main className="flex min-h-screen flex-col items-center p-10">
        <h1 className="text-3xl font-bold text-red-600">Exercise Not Found</h1>
        <Link
          href="/services/trening"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mt-4"
        >
          Back to all exercises
        </Link>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <article className="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <Link
          href="/services/trening"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          &larr; Back to all exercises
        </Link>
        <h1 className="text-3xl font-extrabold mb-4">{exercise.name}</h1>
        {/* Uncomment below to show the gif if available */}
        {exercise.gifUrl && (
          <img
            src={exercise.gifUrl}
            alt={exercise.name}
            className="w-full h-auto mb-4 rounded-lg"
          />
        )}
        <p className="mb-2">
          <strong>Body Part:</strong> {exercise.bodyPart}
        </p>
        <p className="mb-2">
          <strong>Target:</strong> {exercise.target}
        </p>
        <p className="mb-2">
          <strong>Equipment:</strong> {exercise.equipment}
        </p>
      </article>
    </main>
  );
}
