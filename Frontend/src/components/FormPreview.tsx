"use client";

type TipoPergunta =
  | "texto"
  | "paragrafo"
  | "multipla"
  | "nps"
  | "sim_nao"
  | "emoji";

interface Opcao {
  id: string;
  texto: string;
}

interface Pergunta {
  id: string;
  titulo: string;
  tipo: TipoPergunta;
  obrigatoria: boolean;
  opcoes?: Opcao[];
}

interface Props {
  titulo: string;
  descricao: string;
  perguntas: Pergunta[];
}

export default function FormPreview({
  titulo,
  descricao,
  perguntas,
}: Props) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold">{titulo || "Sem título"}</h1>
        <p className="text-gray-500">{descricao}</p>
      </div>

      {/* Perguntas */}
      {perguntas.map((p, index) => (
        <div key={p.id} className="bg-white p-6 rounded-2xl shadow space-y-3">
          <p className="font-medium">
            {index + 1}. {p.titulo || "Pergunta sem título"}
            {p.obrigatoria && <span className="text-red-500 ml-1">*</span>}
          </p>

          {/* TIPOS */}
          {p.tipo === "texto" && (
            <input className="w-full border p-2 rounded-lg" placeholder="Resposta" />
          )}

          {p.tipo === "paragrafo" && (
            <textarea className="w-full border p-2 rounded-lg" placeholder="Resposta longa" />
          )}

          {p.tipo === "multipla" && (
            <div className="space-y-2">
              {p.opcoes?.map((o) => (
                <label key={o.id} className="flex items-center gap-2">
                  <input type="radio" name={p.id} />
                  {o.texto || "Opção"}
                </label>
              ))}
            </div>
          )}

          {p.tipo === "nps" && (
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: 11 }).map((_, i) => (
                <button
                  key={i}
                  className="w-8 h-8 border rounded hover:bg-blue-500 hover:text-white"
                >
                  {i}
                </button>
              ))}
            </div>
          )}

          {p.tipo === "sim_nao" && (
            <div className="flex gap-4">
              <label className="flex gap-2 items-center">
                <input type="radio" name={p.id} /> Sim
              </label>
              <label className="flex gap-2 items-center">
                <input type="radio" name={p.id} /> Não
              </label>
            </div>
          )}

          {p.tipo === "emoji" && (
            <div className="flex gap-3 text-2xl cursor-pointer">
              <span>😀</span>
              <span>😐</span>
              <span>😡</span>
              <span>❤️</span>
              <span>👍</span>
            </div>
          )}
        </div>
      ))}

      <button className="bg-green-600 text-white px-6 py-3 rounded-xl w-full">
        Enviar resposta
      </button>
    </div>
  );
}