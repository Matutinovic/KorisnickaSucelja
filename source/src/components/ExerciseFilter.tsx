"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type Exercise = {
  id: string;
  name: string;
  bodyPart: string;
  target: string;
  equipment: string;
};

type ExerciseFilterProps = {
  initialExercises: Exercise[];
};

export default function ExerciseFilter({ initialExercises }: ExerciseFilterProps) {
  const [exercises, setExercises] = useState(initialExercises);
  const [search, setSearch] = useState("");
  const [bodyPartFilter, setBodyPartFilter] = useState("all");

  // Jedinstveni delovi tela za filter
  const bodyParts = ["all", ...new Set(initialExercises.map((ex) => ex.bodyPart))];

  useEffect(() => {
    let filtered = initialExercises;
    // Pretraga po imenu
    if (search) {
      filtered = filtered.filter((ex) =>
        ex.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    // Filtriranje po delu tela
    if (bodyPartFilter !== "all") {
      filtered = filtered.filter((ex) => ex.bodyPart === bodyPartFilter);
    }
    setExercises(filtered);
  }, [search, bodyPartFilter, initialExercises]);

  return (
    <div className="w-full max-w-2xl mb-6">
      <input
        type="text"
        placeholder="Pretraži vežbe..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <select
        value={bodyPartFilter}
        onChange={(e) => setBodyPartFilter(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      >
        {bodyParts.map((part) => (
          <option key={part} value={part}>
            {part === "all" ? "Svi delovi tela" : part}
          </option>
        ))}
      </select>
      <ul className="space-y-4">
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <li key={exercise.id} className="mb-4">
              <Link
                href={`/services/trening/${exercise.id}`}
                className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 transition-colors duration-200"
              >
                <h2 className="text-2xl font-bold mb-2">{exercise.name}</h2>
                <p className="text-gray-700">Body Part: {exercise.bodyPart}</p>
              </Link>
            </li>
          ))
        ) : (
          <p className="text-gray-700">Nema vežbi za prikaz.</p>
        )}
      </ul>
    </div>
  );
}