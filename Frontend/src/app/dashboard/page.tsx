"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import IndicatorCard from "@/components/IndicatorCard";
import ShortcutCard from "@/components/ShortcutCard";
import ChartCard from "@/components/ChartCard";
import ClimateChart from "@/charts/ClimateChart";
import AdoptionChart from "@/charts/AdoptionChart";
import SurveyAnalytics from "@/components/SurveyAnalytics";

import {
  FaBullhorn,
  FaClipboardList,
  FaExclamationCircle,
  FaUsersCog,
  FaCog,
} from "react-icons/fa";

export default function DashboardPage() {
  const router = useRouter();

  /* ================= MOCK (depois vira API) ================= */
  const perguntas = [
    { id: "1", titulo: "Você gostou do sistema?" },
    { id: "2", titulo: "Nota geral (NPS)" },
  ];

  const respostas = [
    { perguntaId: "1", resposta: "Sim" },
    { perguntaId: "1", resposta: "Não" },
    { perguntaId: "1", resposta: "Sim" },

    { perguntaId: "2", resposta: 10 },
    { perguntaId: "2", resposta: 8 },
    { perguntaId: "2", resposta: 9 },
  ];

  return (
    <div className="p-6">
      <Header />

      {/* ================= INDICADORES ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <IndicatorCard
          title="Avisos Não Lidos"
          value={5}
          onClick={() => router.push("/dashboard/avisos")}
          bgColor="bg-yellow-100"
        />
        <IndicatorCard
          title="Questionários Pendentes"
          value={3}
          onClick={() => router.push("/dashboard/questionarios")}
          bgColor="bg-red-100"
        />
        <IndicatorCard
          title="Volume de Denúncias"
          value={7}
          onClick={() => router.push("/dashboard/denuncias")}
          bgColor="bg-purple-100"
        />
        <IndicatorCard
          title="Adesão aos Comunicados"
          value="78%"
          onClick={() => router.push("/dashboard/avisos")}
          bgColor="bg-green-100"
        />
      </div>

      {/* ================= GRÁFICOS EXISTENTES ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Clima Organizacional">
          <ClimateChart />
        </ChartCard>

        <ChartCard title="Adesão a Comunicados">
          <AdoptionChart />
        </ChartCard>
      </div>

      {/* ================= NOVO: ANALYTICS DE QUESTIONÁRIOS ================= */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          📊 Resultados de Questionários
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SurveyAnalytics
            perguntas={perguntas}
            respostas={respostas}
          />
        </div>
      </div>

      {/* ================= ATALHOS ================= */}
      <h2 className="text-xl font-semibold mb-4">Acesso Rápido</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ShortcutCard
          title="Gestão de Comunicados"
          icon={<FaBullhorn />}
          onClick={() => router.push("/dashboard/avisos")}
        />
        <ShortcutCard
          title="Questionários e Pesquisas"
          icon={<FaClipboardList />}
          onClick={() => router.push("/dashboard/questionarios")}
        />
        <ShortcutCard
          title="Canal de Ética"
          icon={<FaExclamationCircle />}
          onClick={() => router.push("/dashboard/denuncias")}
        />
        <ShortcutCard
          title="Gestão de Usuários"
          icon={<FaUsersCog />}
          onClick={() => router.push("/dashboard/usuarios")}
        />
        <ShortcutCard
          title="Configurações Gerais"
          icon={<FaCog />}
          onClick={() => router.push("/dashboard/configuracoes")}
        />
      </div>
    </div>
  );
}