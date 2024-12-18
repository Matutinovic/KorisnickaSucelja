import fs from "fs";
import path from "path";
import Link from "next/link";

type Exercise = {
  id: string;
  name: string;
  bodyPart: string;
  target: string;
  equipment: string;
};

type TrainingPageProps = {
  searchParams: { page: string };
};

type PaginationProps = {
  currentPage: number;
  pagesCount: number;
};

const PAGE_SIZE = 6;

// Funkcija za dohvat vježbi iz lokalnog JSON file-a
async function getExercises(): Promise<Exercise[]> {
  const filePath = path.join(process.cwd(), "src", "data", "exercises.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData) as Exercise[];
}

function processExercise(exercise: Exercise) {
  const { id, name, bodyPart } = exercise;
  return (
    <li key={id} className="mb-4">
      <Link
        href={`/services/trening/${id}`}
        className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 transition-colors duration-200"
      >
        <h2 className="text-2xl font-bold mb-2">{name}</h2>
        <p className="text-gray-700">Body Part: {bodyPart}</p>
      </Link>
    </li>
  );
}

function Pagination({ currentPage, pagesCount }: PaginationProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesCount;

  return (
    <div className="w-full max-w-2xl mb-6 flex justify-between items-center">
      <Link
        href={`/services/trening?page=${currentPage - 1}`}
        className={`px-4 py-2 rounded-md ${
          isFirstPage
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
        }`}
        aria-disabled={isFirstPage}
      >
        Previous
      </Link>
      <p className="text-gray-700">
        Page <span className="font-bold">{currentPage}</span> of{" "}
        <span className="font-bold">{pagesCount}</span>
      </p>
      <Link
        href={`/services/trening?page=${currentPage + 1}`}
        className={`px-4 py-2 rounded-md ${
          isLastPage
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
        }`}
        aria-disabled={isLastPage}
      >
        Next
      </Link>
    </div>
  );
}

export default async function TrainingPage({ searchParams }: TrainingPageProps) {
  const allExercises = await getExercises();
  const totalExercises = allExercises.length;
  const pagesCount = Math.ceil(totalExercises / PAGE_SIZE);

  const currentPage = Math.min(
    /^[1-9][0-9]*$/.test(searchParams.page) ? Number(searchParams.page) : 1,
    pagesCount
  );

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const exercises = allExercises.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1 className="text-4xl font-extrabold mb-10">All Exercises</h1>
      <Pagination currentPage={currentPage} pagesCount={pagesCount} />
      <ul className="w-full max-w-2xl">{exercises.map(processExercise)}</ul>
    </main>
  );
}
