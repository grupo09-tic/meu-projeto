"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Resposta {
  perguntaId: string;
  resposta: string | number;
}

interface Pergunta {
  id: string;
  titulo: string;
}

interface Props {
  perguntas: Pergunta[];
  respostas: Resposta[];
}

function agrupar(perguntaId: string, respostas: Resposta[]) {
  const dados = respostas.filter((r) => r.perguntaId === perguntaId);

  const contagem: Record<string, number> = {};

  dados.forEach((r) => {
    contagem[r.resposta] = (contagem[r.resposta] || 0) + 1;
  });

  return Object.entries(contagem).map(([name, value]) => ({
    name,
    value,
  }));
}

export default function SurveyAnalytics({ perguntas, respostas }: Props) {
  return (
    <div className="space-y-6">
      {perguntas.map((p) => {
        const data = agrupar(p.id, respostas);

        return (
          <div key={p.id} className="bg-white p-6 rounded-2xl shadow">
            <h2 className="font-semibold mb-4">{p.titulo}</h2>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </div>
  );
}