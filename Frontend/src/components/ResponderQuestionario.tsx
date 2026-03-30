"use client";

import { useState } from "react";

type Pergunta = {
  id: string;
  titulo: string;
  tipo:
    | "texto"
    | "paragrafo"
    | "nps"
    | "sim_nao"
    | "multipla_escolha"
    | "checkbox"
    | "emoji";
  obrigatoria: boolean;
  opcoes?: string[];
};

type Questionario = {
  id?: string;
  titulo: string;
  descricao: string;
  inicio?: string;
  fim?: string;
  perguntas: Pergunta[];
};

type Props = {
  questionario: Questionario;
};

export default function ResponderQuestionario({ questionario }: Props) {
  const [respostas, setRespostas] = useState<Record<string, any>>({});
  const [preview, setPreview] = useState(false);

  function atualizarResposta(perguntaId: string, valor: any) {
    setRespostas((prev) => ({ ...prev, [perguntaId]: valor }));
  }

  function handleSubmit() {
    console.log("Respostas enviadas:", respostas);
    alert("Respostas enviadas com sucesso!");
  }

  const agora = new Date();
  const inicio = questionario.inicio ? new Date(questionario.inicio) : null;
  const fim = questionario.fim ? new Date(questionario.fim) : null;
  const estaAtivo =
    (!inicio || agora >= inicio) && (!fim || agora <= fim);

  if (!estaAtivo)
    return (
      <p className="p-6 text-center text-red-500 font-semibold">
        Este questionário não está disponível no momento.
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-xl space-y-6 shadow-md">
      <h1 className="text-2xl font-bold">{questionario.titulo}</h1>
      <p className="text-gray-600">{questionario.descricao}</p>
      {inicio && fim && (
        <p className="text-sm text-gray-500">
          Disponível de {inicio.toLocaleString()} até {fim.toLocaleString()}
        </p>
      )}

      <button
        onClick={() => setPreview(!preview)}
        className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        {preview ? "Voltar para respostas" : "Pré-visualizar"}
      </button>

      <div className="space-y-6 mt-4">
        {questionario.perguntas.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded-xl shadow space-y-2">
            <p className="font-medium">
              {p.titulo} {p.obrigatoria && <span className="text-red-500">*</span>}
            </p>

            {preview ? (
              <p className="text-gray-500">
                {respostas[p.id] || "Sem resposta"}
              </p>
            ) : (
              <>
                {p.tipo === "texto" && (
                  <input
                    type="text"
                    value={respostas[p.id] || ""}
                    onChange={(e) => atualizarResposta(p.id, e.target.value)}
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                )}

                {p.tipo === "paragrafo" && (
                  <textarea
                    value={respostas[p.id] || ""}
                    onChange={(e) => atualizarResposta(p.id, e.target.value)}
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                )}

                {p.tipo === "multipla_escolha" && p.opcoes && (
                  <div className="space-y-2">
                    {p.opcoes.map((op, i) => (
                      <label key={i} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={p.id}
                          value={op}
                          checked={respostas[p.id] === op}
                          onChange={() => atualizarResposta(p.id, op)}
                        />
                        {op}
                      </label>
                    ))}
                  </div>
                )}

                {p.tipo === "checkbox" && p.opcoes && (
                  <div className="space-y-2">
                    {p.opcoes.map((op, i) => (
                      <label key={i} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={respostas[p.id]?.includes(op) || false}
                          onChange={(e) => {
                            const prev = respostas[p.id] || [];
                            if (e.target.checked) {
                              atualizarResposta(p.id, [...prev, op]);
                            } else {
                              atualizarResposta(
                                p.id,
                                prev.filter((x: string) => x !== op)
                              );
                            }
                          }}
                        />
                        {op}
                      </label>
                    ))}
                  </div>
                )}

                {p.tipo === "nps" && (
                  <div className="flex gap-2">
                    {Array.from({ length: 11 }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => atualizarResposta(p.id, i)}
                        className={`w-8 h-8 border rounded flex items-center justify-center ${
                          respostas[p.id] === i ? "bg-blue-600 text-white" : ""
                        }`}
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                )}

                {p.tipo === "sim_nao" && (
                  <div className="flex gap-4">
                    {["Sim", "Não"].map((op) => (
                      <button
                        key={op}
                        type="button"
                        onClick={() => atualizarResposta(p.id, op)}
                        className={`px-3 py-1 border rounded ${
                          respostas[p.id] === op
                            ? "bg-blue-600 text-white"
                            : ""
                        }`}
                      >
                        {op}
                      </button>
                    ))}
                  </div>
                )}

                {p.tipo === "emoji" && p.opcoes && (
                  <div className="flex gap-2 text-2xl">
                    {p.opcoes.map((op) => (
                      <button
                        key={op}
                        type="button"
                        onClick={() => atualizarResposta(p.id, op)}
                        className={`px-2 py-1 rounded ${
                          respostas[p.id] === op ? "bg-blue-200" : ""
                        }`}
                      >
                        {op}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {!preview && (
        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
        >
          Enviar respostas
        </button>
      )}
    </div>
  );
}