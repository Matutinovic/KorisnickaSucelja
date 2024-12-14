import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};
export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1 className="text-6xl font-extrabold tracking-tight">Log in</h1>
    </main>
  );
}
