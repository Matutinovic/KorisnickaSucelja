"use client";

import { useEffect, useState, FormEvent } from "react";

type Training = {
  id: number;
  name: string;
};

type ExerciseEntry = {
  id: number;
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

type Week = {
  id: number;
  number: number;
};

type Exercise = {
  name: string;
  sets: string | number;
  reps: string | number;
  weight: string | number;
};

export default function ServicesPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [newTrainingName, setNewTrainingName] = useState("");
  const [selectedTrainingId, setSelectedTrainingId] = useState<number | null>(
    null
  );
  const [exercises, setExercises] = useState<ExerciseEntry[]>([]);
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [selectedWeekId, setSelectedWeekId] = useState<number | null>(null);
  const [newWeekNumber, setNewWeekNumber] = useState(1);
  const [newExercise, setNewExercise] = useState<Exercise>({
    name: "",
    sets: "",
    reps: "",
    weight: "",
  });
  const [, setIsLoggedIn] = useState(false); // Dodaj stanje za logiranje

  // Dohvati userId i postavi stanje nakon učitavanja na klijentu
  useEffect(() => {
    const userId =
      typeof window !== "undefined" ? localStorage.getItem("userId") : null;
    if (userId) {
      setIsLoggedIn(true);
    }

    const fetchTrainings = async () => {
      if (!userId) return;
      const res = await fetch(`/api/training?userId=${userId}`);
      const data = await res.json();
      setTrainings(data.trainings);

      const storedTrainingId = localStorage.getItem("selectedTrainingId");
      const storedWeekId = localStorage.getItem("selectedWeekId");

      if (storedTrainingId) {
        setSelectedTrainingId(+storedTrainingId);
      }

      if (storedWeekId) {
        setSelectedWeekId(+storedWeekId);
      }
    };
    fetchTrainings();
  }, []);

  // Fetch weeks for selected training
  useEffect(() => {
    if (!selectedTrainingId) return;

    localStorage.setItem("selectedTrainingId", selectedTrainingId.toString());

    const fetchWeeks = async () => {
      const res = await fetch(`/api/week?trainingId=${selectedTrainingId}`);
      const data = await res.json();
      if (data.success) {
        setWeeks(data.weeks);
        if (data.weeks.length > 0) {
          const maxNumber = Math.max(...data.weeks.map((w: Week) => w.number));
          setNewWeekNumber(maxNumber + 1);
        } else {
          setNewWeekNumber(1);
        }
      }
    };
    fetchWeeks();
  }, [selectedTrainingId]);

  // Fetch exercises for selected week
  useEffect(() => {
    if (!selectedWeekId) return;

    localStorage.setItem("selectedWeekId", selectedWeekId.toString());

    const fetchExercises = async () => {
      const res = await fetch(`/api/exercise-entry?weekId=${selectedWeekId}`);
      const data = await res.json();
      if (data.success) {
        setExercises(data.exercises);
      } else {
        setExercises([]);
      }
    };
    fetchExercises();
  }, [selectedWeekId]);

  const handleCreateTraining = async (e: FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    const res = await fetch("/api/training", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newTrainingName, userId: +userId }),
    });
    const data = await res.json();
    if (data.success) {
      const newTraining = data.training;
      setTrainings([...trainings, newTraining]);
      setNewTrainingName("");
      setSelectedTrainingId(newTraining.id);
      setWeeks([]);
      setExercises([]);
      setSelectedWeekId(null);
    }
  };

  const handleAddWeek = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedTrainingId) return;
    const res = await fetch("/api/week", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        trainingId: selectedTrainingId,
        number: newWeekNumber,
      }),
    });
    const data = await res.json();
    if (data.success) {
      setWeeks([...weeks, data.week]);
      setNewWeekNumber(newWeekNumber + 1);
    }
  };

  const handleAddExercise = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedWeekId || !selectedTrainingId) return;
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const res = await fetch("/api/exercise-entry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        trainingId: +selectedTrainingId,
        weekId: +selectedWeekId,
        ...newExercise,
      }),
    });

    const data = await res.json();
    if (data.success) {
      setExercises([...exercises, data.exerciseEntry]);
      setNewExercise({ name: "", sets: "", reps: "", weight: "" });
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center">Week overview</h1>

      {/* Ostatak koda ostaje isti */}
      <form onSubmit={handleCreateTraining} className="flex gap-4">
        <input
          type="text"
          placeholder="Plan name"
          value={newTrainingName}
          onChange={(e) => setNewTrainingName(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add plan
        </button>
      </form>

      {/* Popis planova */}
      {trainings.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {trainings.map((training) => (
              <button
                key={training.id}
                onClick={() => {
                  setSelectedTrainingId(training.id);
                  setSelectedWeekId(null);
                  setExercises([]);
                }}
                className={`px-4 py-2 rounded border ${
                  selectedTrainingId === training.id
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
              >
                {training.name}
              </button>
            ))}
          </div>

          {/* Tjedni */}
          {selectedTrainingId && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Weeks:</h2>
              <div className="flex flex-wrap gap-2">
                {weeks.map((week) => (
                  <button
                    key={week.id}
                    onClick={() => setSelectedWeekId(week.id)}
                    className={`px-4 py-2 rounded border ${
                      selectedWeekId === week.id
                        ? "bg-purple-500 text-white"
                        : "bg-white"
                    }`}
                  >
                    Week {week.number}
                  </button>
                ))}
              </div>

              <form onSubmit={handleAddWeek} className="flex gap-4 mt-4">
                <input
                  type="number"
                  placeholder="Broj tjedna"
                  min={1}
                  value={newWeekNumber}
                  onChange={(e) => setNewWeekNumber(Number(e.target.value))}
                  className="border p-2 rounded w-40"
                  required
                />
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                  Add week
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Dodavanje vježbi */}
      {selectedWeekId && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Add exercise</h2>
          <form
            onSubmit={handleAddExercise}
            className="grid grid-cols-1 sm:grid-cols-4 gap-4"
          >
            <input
              type="text"
              placeholder="Exercise name"
              value={newExercise.name}
              onChange={(e) =>
                setNewExercise({ ...newExercise, name: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Sets"
              value={newExercise.sets}
              onChange={(e) =>
                setNewExercise({ ...newExercise, sets: Number(e.target.value) })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Repetitions"
              value={newExercise.reps}
              onChange={(e) =>
                setNewExercise({ ...newExercise, reps: Number(e.target.value) })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              value={newExercise.weight}
              onChange={(e) =>
                setNewExercise({
                  ...newExercise,
                  weight: Number(e.target.value),
                })
              }
              className="border p-2 rounded"
              required
            />
            <div className="sm:col-span-4">
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded"
              >
                Add exercise
              </button>
            </div>
          </form>

          <div className="flex flex-wrap gap-4 mt-6">
            {exercises.map((ex) => (
              <div key={ex.id} className="p-4 border rounded shadow w-64">
                <p className="font-bold text-lg">{ex.name}</p>
                <p className="text-sm text-gray-600">
                  {ex.sets} serije x {ex.reps} pon. - {ex.weight} kg
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
