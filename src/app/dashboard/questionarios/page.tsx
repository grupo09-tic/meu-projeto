"use client";

import { useState } from "react";
import Header from "@/components/Header";

const questionarios = [
  { id: 1, title: "Pesquisa de Clima", status: "Pendente", content: "Responda a pesquisa de clima organizacional." },
  { id: 2, title: "Satisfação com Benefícios", status: "Respondido", content: "Avalie seus benefícios atuais." },
];

export default function QuestionariosPage() {
  const [selected, setSelected] = useState<typeof questionarios[0] | null>(null);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Header />
      <h2 className="text-xl font-semibold mb-4">Questionários Pendentes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {questionarios.map((q) => (
          <div
            key={q.id}
            onClick={() => setSelected(q)}
            className={`cursor-pointer p-4 rounded-xl shadow hover:shadow-lg transition flex justify-between items-center ${
              q.status === "Respondido" ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <div>
              <h3 className="font-semibold">{q.title}</h3>
              <p className="text-sm text-gray-600">{q.status}</p>
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