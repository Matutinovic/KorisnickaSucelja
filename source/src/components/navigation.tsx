"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Page = {
  title: string;
  path: `/${string}`;
};

// We hardcode pages here, but you could get this information from some external source (e.g. CMS, DB, config file, etc).
const pages: Page[] = [
  { title: "Home", path: "/" },
  {
    title: "Services",
    path: "/services",
  },
  {
    title: "Blog",
    path: "/blog",
  },
  {
    title: "About us",
    path: "/about",
  },
  {
    title: "Contact us",
    path: "/contact",
  },
  {
    title: "Login",
    path: "/login",
  },
];

function processPage(page: Page, index: number, pathname: string) {
  const isActive = page.path === "/" ? pathname === page.path : pathname.startsWith(page.path);

  return (
    <li key={index}>
      <Link
         href={page.path}
         className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out ${
           isActive
             ? "bg-blue-600 text-white font-semibold shadow-lg"
             : "text-gray-700 hover:bg-gray-200 hover:text-blue-600"
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
    <ul className="flex justify-center space-x-4 mt-8">
      {pages.map((page, index) => processPage(page, index, pathname))}
    </ul>
  );
}
