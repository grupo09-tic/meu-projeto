"use client";

import Header from "@/components/Header";

export default function ConfiguracoesPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Header />
      <h2 className="text-xl font-semibold mb-4">Configurações Gerais</h2>

      <div className="space-y-4">
        <div className="p-4 bg-white rounded-xl shadow">Configuração de notificações</div>
        <div className="p-4 bg-white rounded-xl shadow">Templates de comunicados</div>
        <div className="p-4 bg-white rounded-xl shadow">Segurança e permissões</div>
      </div>
    </div>
  );
}