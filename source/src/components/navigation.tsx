"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
  return (
    <ul className="absolute top-4 right-4 flex space-x-6 p-2 rounded-lg backdrop-blur-md shadow-lg z-10">
      {pages.map((page, index) => processPage(page, index, pathname))}
    </ul>
  );
}
