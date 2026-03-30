"use client";

import { useState } from "react";
import { templates } from "./templates";

export type TipoPergunta =
  | "texto"
  | "paragrafo"
  | "multipla_escolha"
  | "checkbox"
  | "sim_nao"
  | "nps";

export type Pergunta = {
  id: string;
  titulo: string;
  tipo: TipoPergunta;
  obrigatoria: boolean;
  opcoes?: string[];
};

export type Questionario = {
  id: string;
  titulo: string;
  descricao: string;
  inicio?: string;
  fim?: string;
  perguntas: Pergunta[];
};

export default function QuestionEditor({ initialData }: { initialData?: Questionario }) {
  const [modoPreview, setModoPreview] = useState(false);

  const [titulo, setTitulo] = useState(initialData?.titulo || "");
  const [descricao, setDescricao] = useState(initialData?.descricao || "");
  const [inicio, setInicio] = useState(initialData?.inicio || "");
  const [fim, setFim] = useState(initialData?.fim || "");
  const [perguntas, setPerguntas] = useState<Pergunta[]>(initialData?.perguntas || []);

  // ========== Helpers ==========
  function adicionarPergunta() {
    setPerguntas(prev => [
      ...prev,
      { id: crypto.randomUUID(), titulo: "Nova pergunta", tipo: "texto", obrigatoria: false },
    ]);
  }

  function atualizarPergunta(id: string, campo: keyof Pergunta, valor: any) {
    setPerguntas(prev => prev.map(p => (p.id === id ? { ...p, [campo]: valor } : p)));
  }

  function removerPergunta(id: string) {
    setPerguntas(prev => prev.filter(p => p.id !== id));
  }

  function aplicarTemplate(template: Questionario) {
    setTitulo(template.titulo);
    setDescricao(template.descricao);
    setInicio(template.inicio || "");
    setFim(template.fim || "");
    setPerguntas(template.perguntas);
  }

  function salvar() {
    const dados: Questionario = {
      id: initialData?.id || crypto.randomUUID(),
      titulo,
      descricao,
      inicio,
      fim,
      perguntas,
    };
    const existentes = JSON.parse(localStorage.getItem("questionarios") || "[]");
    localStorage.setItem("questionarios", JSON.stringify([...existentes, dados]));
    alert("Questionário salvo!");
  }

  // ========== UI ==========
  if (modoPreview) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <button onClick={() => setModoPreview(false)} className="text-blue-600">← Voltar</button>

        <div className="bg-white p-6 rounded-xl shadow space-y-3">
          <h1 className="text-2xl font-bold">{titulo}</h1>
          <p className="text-gray-600">{descricao}</p>
          {(inicio || fim) && (
            <p className="text-sm text-gray-500">
              Disponível: {inicio || "—"} até {fim || "—"}
            </p>
          )}
        </div>

        {perguntas.map(p => (
          <div key={p.id} className="bg-white p-5 rounded-xl shadow space-y-2">
            <p className="font-medium">{p.titulo}{p.obrigatoria && <span className="text-red-500">*</span>}</p>

            {p.tipo === "texto" && <input className="border p-2 rounded w-full" />}
            {p.tipo === "paragrafo" && <textarea className="border p-2 rounded w-full" />}
            {p.tipo === "multipla_escolha" && p.opcoes?.map((op, i) => (
              <label key={i} className="block"><input type="radio" /> {op}</label>
            ))}
            {p.tipo === "checkbox" && p.opcoes?.map((op, i) => (
              <label key={i} className="block"><input type="checkbox" /> {op}</label>
            ))}
            {p.tipo === "sim_nao" && (
              <div className="flex gap-4">
                <button className="border px-3 py-1 rounded">Sim</button>
                <button className="border px-3 py-1 rounded">Não</button>
              </div>
            )}
            {p.tipo === "nps" && (
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: 11 }).map((_, i) => (
                  <div key={i} className="w-8 h-8 border flex items-center justify-center rounded">{i}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Template */}
      <div className="flex gap-2 items-center">
        <label>Templates:</label>
        <select
          onChange={e => {
            const t = templates.find(t => t.titulo === e.target.value);
            if (t) aplicarTemplate(t);
          }}
          className="border p-2 rounded"
        >
          <option value="">Selecione um template</option>
          {templates.map(t => <option key={t.id} value={t.titulo}>{t.titulo}</option>)}
        </select>
      </div>

      {/* Top Bar */}
      <div className="flex justify-between">
        <button onClick={() => setModoPreview(true)} className="bg-gray-200 px-4 py-2 rounded">Pré-visualização</button>
        <button onClick={salvar} className="bg-green-600 text-white px-4 py-2 rounded">Salvar</button>
      </div>

      {/* Questionário */}
      <div className="bg-white p-6 rounded-xl shadow space-y-3">
        <input value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Título" className="w-full text-2xl font-bold outline-none" />
        <textarea value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descrição" className="w-full text-gray-600 outline-none" />
        <div className="flex gap-4 mt-2">
          <input type="date" value={inicio} onChange={e => setInicio(e.target.value)} className="border p-2 rounded" />
          <input type="date" value={fim} onChange={e => setFim(e.target.value)} className="border p-2 rounded" />
        </div>
      </div>

      {/* Perguntas */}
      {perguntas.map(p => (
        <div key={p.id} className="bg-white p-5 rounded-xl shadow space-y-3">
          <input value={p.titulo} onChange={e => atualizarPergunta(p.id, "titulo", e.target.value)} className="w-full border-b outline-none" />
          <select value={p.tipo} onChange={e => atualizarPergunta(p.id, "tipo", e.target.value as TipoPergunta)} className="border p-2 rounded">
            <option value="texto">Resposta curta</option>
            <option value="paragrafo">Parágrafo</option>
            <option value="multipla_escolha">Múltipla escolha</option>
            <option value="checkbox">Checkbox</option>
            <option value="sim_nao">Sim/Não</option>
            <option value="nps">NPS</option>
          </select>

          {(p.tipo === "multipla_escolha" || p.tipo === "checkbox") && (
            <>
              <div className="flex gap-2">
                <button onClick={() => atualizarPergunta(p.id, "opcoes", ["😍 Excelente", "🙂 Boa", "😐 Média", "😡 Ruim"])}>😃 Satisfação</button>
                <button onClick={() => atualizarPergunta(p.id, "opcoes", ["👍 Sim", "👎 Não"])}>👍 Sim/Não</button>
              </div>
              {(p.opcoes || []).map((op, i) => (
                <input key={i} value={op} onChange={e => {
                  const novas = [...(p.opcoes || [])];
                  novas[i] = e.target.value;
                  atualizarPergunta(p.id, "opcoes", novas);
                }} className="border p-2 rounded w-full" />
              ))}
              <button onClick={() => atualizarPergunta(p.id, "opcoes", [...(p.opcoes || []), "Nova opção"])}>+ opção</button>
            </>
          )}

          <div className="flex justify-between">
            <label>
              <input type="checkbox" checked={p.obrigatoria} onChange={e => atualizarPergunta(p.id, "obrigatoria", e.target.checked)} /> Obrigatória
            </label>
            <button onClick={() => removerPergunta(p.id)}>❌</button>
          </div>
        </div>
      ))}

      <button onClick={adicionarPergunta} className="w-full bg-blue-600 text-white py-3 rounded-xl">+ Adicionar pergunta</button>
    </div>
  );
}