"use client";

import { useParams } from "next/navigation";

export default function MuralDetail() {
  const params = useParams();
  const id = params.id; // pega o id da URL, ex: /mural/123 → id = "123"

  // Aqui você buscaria os dados do comunicado pelo ID
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Comunicado {id}</h1>
      <p>Detalhes do comunicado aqui...</p>
    </div>
  );
}