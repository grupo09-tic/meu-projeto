"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <nav className="flex flex-col gap-4">
        <Link href="/">🏠 Home</Link>
        <Link href="/login">🔑 Login</Link>
      </nav>
    </aside>
  );
}