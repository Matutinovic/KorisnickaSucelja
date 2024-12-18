"use client";

const BulletPoints = () => {
  const points = [
    "The user can mark each set in the order in which he performed the exercises.",
    "For each set, the user can enter the exact weight they were working with.",
    "With each set, the user can record the number of repetitions, allowing detailed insight into their own progress.",
  ];

  return (
    <div className="flex flex-col space-y-4 relative z-20">
      {points.map((point, index) => (
        <div key={index} className="flex items-start">
          <span className="text-green-500 font-bold text-2xl mr-2">✔</span>
          <p className="text-black text-2xl font-bold leading-snug">
            {point}
          </p>{" "}
          {/* Dodali smo stilove */}
        </div>
      ))}
    </div>
  );
};

export default BulletPoints;
