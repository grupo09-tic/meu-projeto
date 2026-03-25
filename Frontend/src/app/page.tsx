"use client";

import Card from "@/components/Card";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Cards de indicadores */}
      <Card title="Avaliações Pendentes" value="12" />
      <Card title="Usuários Ativos" value="34" />
      <Card title="Alertas Importantes" value="3" />

      {/* Mural de avisos */}
      <div className="col-span-1 md:col-span-3 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Mural de Avisos</h2>
        <ul className="list-disc pl-5">
          <li>Nova política de home office disponível.</li>
          <li>Questionário trimestral aberto para preenchimento.</li>
          <li>Reunião geral amanhã às 10h.</li>
        </ul>
      </div>
    </div>
  );
}