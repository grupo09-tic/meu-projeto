"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlus, FaSearch, FaEye, FaEdit } from "react-icons/fa";
import { templates } from "@/data/templates";

export default function QuestionariosPage() {
  const router = useRouter();

  const [busca, setBusca] = useState("");

  /* MOCK */
  const questionarios = [
  {
    id: "1",
    titulo: "Pesquisa de Satisfação",
    status: "ativo",
    respostas: 12,
    criadoEm: "2026-03-01",
    expiraEm: "2026-04-01",
  },
  {
    id: "2",
    titulo: "Clima Organizacional",
    status: "rascunho",
    respostas: 0,
    criadoEm: "2026-03-10",
    expiraEm: null,
  },
  {
    id: "3",
    titulo: "Feedback Produto",
    status: "ativo",
    respostas: 34,
    criadoEm: "2026-02-01",
    expiraEm: "2026-03-10",
  },
];

  const filtrados = questionarios.filter((q) =>
    q.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  function getStatusColor(status: string) {
    if (status === "ativo") return "bg-green-100 text-green-700";
    if (status === "rascunho") return "bg-yellow-100 text-yellow-700";
    return "bg-gray-200 text-gray-600";
  }
  function formatarData(data: string | null) {
  if (!data) return "Sem prazo";
  return new Date(data).toLocaleDateString("pt-BR");
}

function getStatusTempo(expiraEm: string | null) {
  if (!expiraEm) return null;

  const hoje = new Date();
  const exp = new Date(expiraEm);

  const diff = Math.ceil(
    (exp.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diff < 0) return "expirado";
  if (diff <= 3) return "expirando";

  return "ok";
}

function getStatusLabel(q: any) {
  const tempo = getStatusTempo(q.expiraEm);

  if (tempo === "expirado") return "Encerrado";
  if (q.status === "rascunho") return "Rascunho";
  return "Ativo";
}

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Questionários</h1>

        <button
          onClick={() => router.push("/questionarios/new")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700"
        >
          <FaPlus /> Novo questionário
        </button>
      </div>

      {/* BUSCA */}
      <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow">
        <FaSearch className="text-gray-400" />
        <input
          placeholder="Buscar questionário..."
          className="w-full outline-none"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {/* ================= TEMPLATES ================= */}
<div className="mb-8">
  <h2 className="text-lg font-semibold mb-4">
    ✨ Começar com um modelo
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {templates.map((t) => (
      <div
        key={t.id}
        onClick={() =>
          router.push(`/questionarios/new?template=${t.id}`)
        }
        className="cursor-pointer bg-white p-4 rounded-2xl shadow hover:shadow-lg transition border hover:border-blue-500"
      >
        <h3 className="font-semibold">{t.titulo}</h3>
        <p className="text-sm text-gray-500">{t.descricao}</p>
      </div>
    ))}
  </div>
</div>

      {/* LISTA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtrados.map((q) => (
          <div
            key={q.id}
            className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition space-y-4"
          >
            {/* Título */}
            <h2 className="font-semibold text-lg">{q.titulo}</h2>

            {/* Status */}
            <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(q.status)}`}>
  {getStatusLabel(q)}
</span>

            {/* Info */}
            <div className="text-sm text-gray-500 space-y-1">
  <p>{q.respostas} respostas</p>

  <p>📅 Criado em: {formatarData(q.criadoEm)}</p>

  <p>
    ⏳ Expira em:{" "}
    <span
      className={
        getStatusTempo(q.expiraEm) === "expirado"
          ? "text-red-500 font-medium"
          : getStatusTempo(q.expiraEm) === "expirando"
          ? "text-yellow-600 font-medium"
          : ""
      }
    >
      {formatarData(q.expiraEm)}
    </span>
  </p>
</div>

            {/* Ações */}
            <div className="flex justify-between pt-2">
              <button
                onClick={() => router.push(`/questionarios/${q.id}`)}
                className="flex items-center gap-1 text-blue-600"
              >
                <FaEye /> Ver
              </button>

              <button
                onClick={() => router.push(`/questionarios/${q.id}`)}
                className="flex items-center gap-1 text-gray-600"
              >
                <FaEdit /> Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}