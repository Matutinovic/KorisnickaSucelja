"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton"; // import logout button

type Page = {
  title: string;
  path: `/${string}`;
};

const pages: Page[] = [
  { title: "Home", path: "/" },
  { title: "Services", path: "/services" },
  { title: "Blog", path: "/blog" },
  { title: "About us", path: "/about" },
  { title: "Contact us", path: "/contact" },
  { title: "Login", path: "/login" },
  { title: "Register", path: "/register" },
];

function processPage(page: Page, index: number, pathname: string) {
  const isActive =
    page.path === "/" ? pathname === page.path : pathname.startsWith(page.path);

  return (
    <li key={index}>
      <Link
        href={page.path}
        className={`px-4 py-2 text-xl rounded-lg transition-all duration-300 ease-in-out ${
          isActive
            ? "bg-[#2A8EA7] text-white font-semibold shadow-lg"
            : "text-white hover:bg-gray-200 hover:text-[#F6AE87]"
        }`}
      >
        {page.title}
      </Link>
    </li>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  return (
    <nav className="absolute top-4 right-4 z-10">
      {/* Hamburger / X button */}
      <button
        className="fixed top-4 right-4 block lg:hidden text-white text-2xl p-2 rounded-md bg-[#2A8EA7] z-20"
        onClick={() => setMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? "✖" : "☰"}
      </button>

      {/* Navigation menu */}
      <ul
        className={`flex flex-col lg:flex-row 
    items-center 
    space-y-4 lg:space-y-0 lg:space-x-6 
    p-4 lg:p-2 
    rounded-lg 
    backdrop-blur-md 
    shadow-lg 
    transition-all duration-300 ease-in-out 
    mt-10 lg:mt-0
    ${isMenuOpen ? "block" : "hidden lg:flex"}`}
      >
        {pages.map((page, index) => {
          // Ako je korisnik logiran, preskoči Login i Register
          if (userId && (page.title === "Login" || page.title === "Register"))
            return null;

          return processPage(page, index, pathname);
        })}

        {/* Ako je korisnik logiran, pokaži logout button */}
        {userId && (
          <li>
            <LogoutButton />
          </li>
        )}
      </ul>
    </nav>
  );
}
