"use client";

import Header from "./Header";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Não mostrar Header/Sidebar na página de login
  const hideLayout = pathname === "/login";

  if (hideLayout) return <>{children}</>; // apenas renderiza o conteúdo

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen ml-64 pt-16">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}