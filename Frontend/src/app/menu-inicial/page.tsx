"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HeaderFixo from "../../components/Header";


export default function MenuInicial() {
  const router = useRouter();

  const [avisos, setAvisos] = useState([
    { id: 1, texto: "Atualização do RH disponível.", ciente: false },
    { id: 2, texto: "Novo questionário de clima lançado.", ciente: false },
    { id: 3, texto: "Mural corporativo atualizado.", ciente: false },
  ]);

  const marcarCiente = (id: number) => {
    setAvisos(prev =>
      prev.map(aviso =>
        aviso.id === id ? { ...aviso, ciente: true } : aviso
      )
    );
  };

  return (
    <>
      <main className="pt-24 px-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Menu Inicial</h1>

        {/* Painel de Avisos */}
        <div className="mb-8 bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Comunicados Recentes</h2>
          <ul className="space-y-3">
            {avisos.map(aviso => (
              <li
                key={aviso.id}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
              >
                <span className={aviso.ciente ? "line-through text-gray-400" : "text-gray-700"}>
                  {aviso.texto}
                </span>
                {!aviso.ciente && (
                  <button
                    onClick={() => marcarCiente(aviso.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600"
                  >
                    Ciente
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Cards do Menu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            onClick={() => router.push("/rh")}
            className="bg-white p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition"
          >
            <h3 className="text-xl font-semibold mb-2">RH / Documentos</h3>
            <p className="text-gray-500 text-sm">Gestão de documentos e contracheques.</p>
          </div>

          <div
            onClick={() => router.push("/questionarios")}
            className="bg-white p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition"
          >
            <h3 className="text-xl font-semibold mb-2">Questionários</h3>
            <p className="text-gray-500 text-sm">Módulo de Escuta Ativa.</p>
          </div>

          <div
            onClick={() => router.push("/mural")}
            className="bg-white p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition"
          >
            <h3 className="text-xl font-semibold mb-2">Comunicados / Mural</h3>
            <p className="text-gray-500 text-sm">Acesse o mural corporativo.</p>
          </div>
        </div>
      </main>
    </>
  );
}