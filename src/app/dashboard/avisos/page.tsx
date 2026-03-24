"use client";

import { useState } from "react";
import Header from "@/components/Header";
import AvisoCard from "@/components/AvisoCard";
import AvisoModal from "@/components/AvisoModal";

const avisos = [
  { id: 1, title: "Nova política de segurança", date: "2026-03-24", status: "Não Lido", content: "Detalhes..." },
  { id: 2, title: "Reunião geral", date: "2026-03-20", status: "Lido", content: "Detalhes..." },
];

export default function AvisosPage() {
  const [selectedAviso, setSelectedAviso] = useState<typeof avisos[0] | null>(null);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Header />
      <h2 className="text-xl font-semibold mb-4">Avisos / Comunicados</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {avisos.map((aviso) => (
          <AvisoCard
            key={aviso.id}
            title={aviso.title}
            date={aviso.date}
            status={aviso.status as "Lido" | "Não Lido"}
            onClick={() => setSelectedAviso(aviso)}
          />
        ))}
      </div>

      {selectedAviso && (
        <AvisoModal
          title={selectedAviso.title}
          content={selectedAviso.content}
          onClose={() => setSelectedAviso(null)}
        />
      )}
    </div>
  );
}