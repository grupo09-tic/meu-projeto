"use client";
import { useEffect } from "react";

export default function UsuariosError({ error }: { error: Error }) {
  useEffect(() => console.error(error), [error]);

  return (
    <div className="text-center mt-20 text-red-500">
      <h1 className="text-2xl font-bold">Erro ao carregar usuários/empresas</h1>
      <p>{error.message}</p>
    </div>
  );
}