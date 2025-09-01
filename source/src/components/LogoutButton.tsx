"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    router.push("/services");
  };

  return (
    typeof window !== "undefined" && localStorage.getItem("userId") ? (
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Log out
      </button>
    ) : null
  );
}