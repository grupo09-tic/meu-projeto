"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

export default function QuestionariosPage() {
  const router = useRouter();

  const [questionarios, setQuestionarios] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);

  /* ================= CARREGAR DADOS ================= */
  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("questionarios") || "[]"
    );

    const respostas = JSON.parse(
      localStorage.getItem("respostas") || "[]"
    );

    // marca como respondido se já existir resposta
    const comStatus = data.map((q: any) => {
      const foiRespondido = respostas.some(
        (r: any) => r.questionarioId === q.id
      );

      return {
        ...q,
        status: foiRespondido ? "Respondido" : "Pendente",
      };
    });

    setQuestionarios(comStatus);
  }, []);

  /* ================= FILTROS ================= */

  const pendentes = questionarios.filter(
    (q) => q.status === "Pendente"
  );

  const respondidos = questionarios.filter(
    (q) => q.status === "Respondido"
  );

  /* ================= UI ================= */

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Header />

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          Questionários
        </h2>

        <button
          onClick={() => router.push("/questionarios/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          + Criar Questionário
        </button>
      </div>

      {/* ================= PENDENTES ================= */}
      <h3 className="text-lg font-semibold mb-3 text-gray-700">
        Pendentes
      </h3>

      {pendentes.length === 0 && (
        <p className="text-gray-500 mb-6">
          Nenhum questionário pendente.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {pendentes.map((q) => (
          <div
            key={q.id}
            onClick={() => setSelected(q)}
            className="cursor-pointer p-5 rounded-2xl shadow-sm hover:shadow-xl transition bg-white border hover:border-blue-500"
          >
            <h3 className="font-semibold text-lg">
              {q.titulo}
            </h3>

            <p className="text-sm mt-1 text-red-500">
              {q.status}
            </p>
          </div>
        ))}
      </div>

      {/* ================= RESPONDIDOS ================= */}
      <h3 className="text-lg font-semibold mb-3 text-gray-700">
        Respondidos
      </h3>

      {respondidos.length === 0 && (
        <p className="text-gray-500">
          Nenhum questionário respondido.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {respondidos.map((q) => (
          <div
            key={q.id}
            onClick={() => setSelected(q)}
            className="cursor-pointer p-5 rounded-2xl shadow-sm hover:shadow-xl transition bg-white border hover:border-green-500"
          >
            <h3 className="font-semibold text-lg">
              {q.titulo}
            </h3>

            <p className="text-sm mt-1 text-green-600">
              {q.status}
            </p>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-bold mb-2">
              {selected.titulo}
            </h2>

            <p className="text-gray-600 mb-6">
              {selected.descricao || "Sem descrição"}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Fechar
              </button>

              <button
                onClick={() => {
                  setSelected(null);
                  router.push(`/questionarios/${selected.id}`);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Responder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}