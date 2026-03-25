"use client";
import { useEffect } from "react";

export default function QuestionariosError({ error }: { error: Error }) {
  useEffect(() => console.error(error), [error]);

  return (
    <div className="text-center mt-20">
      <h1 className="text-2xl font-bold text-red-500">Erro ao carregar questionários</h1>
      <p className="mt-4 text-gray-700">{error.message}</p>
    </div>
  );
}