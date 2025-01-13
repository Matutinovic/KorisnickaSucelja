"use client";
const ButtonGroup = () => (
  <div className="absolute left-[5%] top-[78%] sm:left-[10%] sm:top-[72%] flex space-x-4 sm:space-x-8 z-20">
    <button className="w-40 px-5 py-2 text-white bg-black text-lg font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300">
      SIGN IN
    </button>
    <button className="w-40 px-5 py-2 text-black border-2 border-black text-lg font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300">
      FREE TRIAL
    </button>
  </div>
);

export default ButtonGroup;
