"use client";

import { useState } from "react";
import Header from "@/components/Header";

const denuncias = [
  { id: 1, title: "Assédio no Escritório", status: "Pendente", content: "Detalhes da denúncia..." },
  { id: 2, title: "Uso indevido de Recursos", status: "Em Análise", content: "Detalhes da denúncia..." },
];

export default function DenunciasPage() {
  const [selected, setSelected] = useState<typeof denuncias[0] | null>(null);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Header />
      <h2 className="text-xl font-semibold mb-4">Canal de Ética / Denúncias</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {denuncias.map((d) => (
          <div
            key={d.id}
            onClick={() => setSelected(d)}
            className={`cursor-pointer p-4 rounded-xl shadow hover:shadow-lg transition flex justify-between items-center ${
              d.status === "Pendente" ? "bg-yellow-100" : d.status === "Em Análise" ? "bg-purple-100" : "bg-green-100"
            }`}
          >
            <div>
              <h3 className="font-semibold">{d.title}</h3>
              <p className="text-sm text-gray-600">{d.status}</p>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">{selected.title}</h2>
            <p className="text-gray-700 mb-6">{selected.content}</p>
            <button
              onClick={() => setSelected(null)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}