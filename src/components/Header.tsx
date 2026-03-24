"use client";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    try {
      // localStorage.removeItem("token"); // opcional
      router.push("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <header className="w-full h-16 bg-blue-600 text-white flex items-center justify-between px-6 shadow-md fixed top-0 left-0 z-50">
      <div
        onClick={() => router.push("/dashboard")}
        className="text-lg md:text-xl font-semibold cursor-pointer hover:opacity-80 transition"
      >
        Plataforma de Avaliação Organizacional
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm md:text-base">
          Olá, <strong>Usuário</strong>
        </span>

        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
        >
          Sair
        </button>
      </div>
    </header>
  );
}