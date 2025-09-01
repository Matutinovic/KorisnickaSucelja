"use client";

const BulletPoints2 = () => {
  const points = [
    "Detailed selection of training plans like Chest Day to focus on your progress tracking.",
    "Record your personal bests for individual exercises such as Bench Press from that specific training plan to monitor your PR.",
    "Gain insight into a graph displaying your Personal Record (PR) progress, featuring a trend line that may rise or fall based on your performance over time.",
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

export default BulletPoints2;
