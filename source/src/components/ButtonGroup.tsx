"use client";

import Link from "next/link";

const ButtonGroup = () => (
  <div className="flex space-x-2 sm:space-x-4 md:space-x-8 mb-16">
    <Link href="/login">
      <button className="w-28 sm:w-32 md:w-40 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-sm sm:text-base md:text-lg text-white bg-black font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300">
        SIGN IN
      </button>
    </Link>
    <Link href="/about">
      <button className="w-28 sm:w-32 md:w-40 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-sm sm:text-base md:text-lg text-black border-2 border-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300">
        About Us
      </button>
    </Link>
  </div>
);

export default ButtonGroup;
