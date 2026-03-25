"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Questionários", href: "/questionarios" },
    { label: "Informativos / RH", href: "/informativos" },
    { label: "Relatórios", href: "/relatorios" },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen fixed top-16 left-0 p-4">
      <nav className="flex flex-col gap-3">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-2 rounded hover:bg-gray-700 transition ${
              pathname === item.href ? "bg-gray-700 font-semibold" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}