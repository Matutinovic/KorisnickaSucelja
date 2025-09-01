"use client";

const BulletPoints = () => {
  const points = [
    "The user can create and manage a personalized training plan tailored to their schedule.",
    "Users can select a specific week to organize and track their workout sessions.",
    "The application allows filtering exercises by body part and searching through a comprehensive list of options like Bench Press or Squat.",
  ];

  return (
    <div className="flex flex-col space-y-4 relative z-20">
      {points.map((point, index) => (
        <div key={index} className="flex items-start">
          <span className="text-green-500 font-bold text-lg sm:text-xl md:text-2xl mr-2">
            ✔
          </span>
          <p className="text-black text-base sm:text-lg md:text-2xl font-bold leading-snug">
            {point}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BulletPoints;
