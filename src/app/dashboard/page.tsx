// app/dashboard/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [abrirDenuncia, setAbrirDenuncia] = useState(false);
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erroDenuncia, setErroDenuncia] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);

  // Função para enviar denúncia anônima
  const handleDenuncia = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErroDenuncia("");

    if (!assunto || !mensagem) {
      setErroDenuncia("Assunto e mensagem são obrigatórios");
      return;
    }

    const denuncia = { assunto, mensagem, arquivo, anonimo: true };
    console.log("Denúncia enviada:", denuncia);
    alert("Denúncia enviada com sucesso!");

    // Limpar campos e fechar popup
    setAssunto("");
    setMensagem("");
    setArquivo(null);
    setAbrirDenuncia(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-green-700 p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => router.push("/login")}
        >
          Logout
        </button>
      </header>

      {/* Conteúdo principal */}
      <main className="bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">Bem-vindo(a)!</h2>
        <p className="text-gray-600 mb-6">
          Você fez login com sucesso. Aqui você pode acessar seus módulos e funcionalidades.
        </p>

        {/* Botão de denúncia */}
        <button
          className="bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-600 shadow-lg"
          onClick={() => setAbrirDenuncia(true)}
        >
        Canal de Denúncia
        </button>
      </main>

      {/* POPUP DENÚNCIA */}
      {abrirDenuncia && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl p-8 rounded-2xl shadow-2xl">

            {/* CABEÇALHO */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Canal de Denúncia</h2>
              <button onClick={() => setAbrirDenuncia(false)} className="text-gray-500 text-xl">
                ✕
              </button>
            </div>

            {/* MENSAGEM DE ANONIMATO */}
            <p className="text-sm text-gray-500 mb-4">
              Esta denúncia é 100% anônima. Nenhuma informação pessoal será coletada.
            </p>

            <form onSubmit={handleDenuncia} className="flex flex-col gap-4">

              {/* CAMPO ASSUNTO */}
              <input
                type="text"
                placeholder="Assunto"
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
                className="p-3 border rounded-lg"
              />

              {/* CAMPO MENSAGEM */}
              <textarea
                placeholder="Descreva sua denúncia..."
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                className="p-3 border rounded-lg h-32"
              />

              {/* ERRO NÃO PREENCHIMENTO */}
              {erroDenuncia && <p className="text-red-500 text-sm">{erroDenuncia}</p>}

              {/* UPLOAD DE ARQUIVO */}
              <div>
                <label className="text-sm text-gray-600 block mb-2">Anexar arquivo (opcional)</label>
                <label className="bg-gray-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer inline-block">
                  📎 Selecionar arquivo
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) setArquivo(e.target.files[0]);
                    }}
                  />
                </label>
                {arquivo && <p className="text-sm text-gray-500 mt-2">Arquivo selecionado: {arquivo.name}</p>}
              </div>

              {/* BOTÕES CANCELAR E ENVIAR */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setAbrirDenuncia(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                >
                  Enviar denúncia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}