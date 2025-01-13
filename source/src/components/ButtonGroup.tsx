"use client";
const ButtonGroup = () => (
  <div className="absolute left-[5%] top-[72%] sm:left-[10%] sm:top-[68%] flex space-x-4 sm:space-x-10 z-20">
    <button className="w-48 px-6 py-3 text-white bg-black text-xl font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300">
      SIGN IN
    </button>
    <button className="w-48 px-6 py-3 text-black border-2 border-black text-xl font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300">
      FREE TRIAL
    </button>
  </div>
);

export default ButtonGroup;
