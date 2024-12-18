"use client";

const BulletPoints2 = () => {
  const points = [
    "Detailed graphs showing your progress in each workout, helping you track your progress over time",
    "Record your personal bests for each exercise and watch your maximum performance improve",
    "Automatically calculate your 1RM, your maximum weight in one repetition",
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

export default BulletPoints2;
