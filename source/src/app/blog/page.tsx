import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
};

// This is typically fetched from an API
const posts = [12, 3, 56, 7, 89];

function processPost(id: number) {
  return (
    <li key={id}>
      <Link href={`/blog/${id}`}>Post {id}</Link>
    </li>
  );
}

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1 className="text-6xl font-extrabold tracking-tight">Blog</h1>
      <ul>{posts.map(processPost)}</ul>
    </main>
  );
}
