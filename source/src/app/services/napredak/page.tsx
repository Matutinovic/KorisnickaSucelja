"use client";

import { useState, useEffect } from "react"; // Dodan useEffect za fetch treninga.
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Tipovi
type Training = {
  id: string;
  name: string;
};

type ExerciseEntryForPR = {
  weight: number;
  reps: number;
  weekNumber: number;
};

type PRData = {
  weekNumber: number;
  pr: number;
};

export default function PRProgressPage() {
  const [trainings, setTrainings] = useState<Training[]>([]); // Lista treninga za dropdown.
  const [selectedTrainingId, setSelectedTrainingId] = useState<string>(""); // Izabrani trening.
  const [exerciseName, setExerciseName] = useState("");
  const [prData, setPRData] = useState<PRData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  // Fetch treninga za korisnika pri učitavanju stranice.
  useEffect(() => {
    if (!userId) return;

    const fetchTrainings = async () => {
      try {
        const res = await fetch(`/api/training?userId=${userId}`);
        const data = await res.json();
        if (data.trainings) {
          setTrainings(data.trainings);
        } else {
          setError("Greška pri dohvatanju treninga.");
        }
      } catch {
        setError("Greška pri fetch-u treninga.");
      }
    };
    fetchTrainings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !selectedTrainingId || !exerciseName) {
      setError("Potreban je trening i naziv vežbe.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setPRData([]);

    try {
      const res = await fetch(
        `/api/pr-progress?userId=${userId}&trainingId=${selectedTrainingId}&exerciseName=${exerciseName}`
      );
      const data = await res.json();
      if (data.success) {
        const groupedPR = data.exercises.reduce(
          (acc: { [key: number]: number }, entry: ExerciseEntryForPR) => {
            const pr = entry.weight * entry.reps * 0.0333 + entry.weight;
            if (!acc[entry.weekNumber] || pr > acc[entry.weekNumber]) {
              acc[entry.weekNumber] = pr;
            }
            return acc;
          },
          {}
        );

        const formattedData = Object.keys(groupedPR)
          .map((week) => ({
            weekNumber: Number(week),
            pr: groupedPR[Number(week)],
          }))
          .sort((a, b) => a.weekNumber - b.weekNumber);

        setPRData(formattedData);
      } else {
        setError(data.message || "Greška pri dohvatanju podataka.");
      }
    } catch {
      setError("Greška pri fetch-u.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center">Napredak (PR) za vežbu</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select
          value={selectedTrainingId}
          onChange={(e) => setSelectedTrainingId(e.target.value)}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Odaberi trening</option>
          {trainings.map((training) => (
            <option key={training.id} value={training.id}>
              {training.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Naziv vežbe (npr. Bench Press)"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          Pokaži PR
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}
      {isLoading && <p className="text-gray-600">Dohvaćam podatke...</p>}

      {prData.length > 0 ? (
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={prData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="weekNumber"
                label={{
                  value: "Tjedan",
                  position: "insideBottomRight",
                  offset: -10,
                }}
              />
              <YAxis
                label={{
                  value: "PR (1RM)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pr"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        !isLoading && (
          <p className="text-gray-600">
            Nema podataka za prikaz. Odaberite trening i unesite vežbu.
          </p>
        )
      )}
    </main>
  );
}
