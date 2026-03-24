// app/validausersenha/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ValidaUserSenha() {
  const router = useRouter();

  // Se quiser, você pode redirecionar usuários não logados
  // Aqui estamos apenas mostrando um exemplo simples

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-blue-700">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
        <h1 className="text-3xl font-bold mb-4">Bem-vindo(a)!</h1>
        <p className="text-gray-600 mb-6">
          Você fez login com sucesso.
        </p>

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          onClick={() => router.push("/login")}
        >
          Logout
        </button>
      </div>
    </div>
  );
}