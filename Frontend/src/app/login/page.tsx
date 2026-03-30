"use client";

import Image from "next/image";
import { useState, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import DenunciaModal from "../../components/DenunciaModal";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [abrirDenuncia, setAbrirDenuncia] = useState(false);
  const [toast, setToast] = useState("");

  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToast(""), 3000);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErro("");
    if (!email || !senha) {
      setErro("Preencha todos os campos");
      return;
    }
    setLoading(true);
    
    // Simulação de Login
    setTimeout(() => {
      if (email === "admin@empresa.com" && senha === "1234") {
        router.push("/dashboard");
      } else {
        setErro("Usuário ou senha inválidos");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    /* 1. FUNDO: Gradiente azul ocupando 100% da tela */
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 p-4">
      
      {/* 2. CARD BRANCO COMPACTO: Largura max 320px e bordas arredondadas */}
      <div className="bg-white w-full max-w-[320px] p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] relative z-10 animate-in fade-in zoom-in duration-500">
        
        {/* LOGO EMPRESA*/}
        <div className="flex justify-center mb-6">
          <Image 
            src="/img/logo.png" 
            alt="Logo" 
            width={200} 
            height={60} 
            priority 
            className="h-auto w-auto" 
          />
        </div>

        <h2 className="text-xs text-gray-400 text-center mb-6 font-medium uppercase tracking-widest">
          Acesse sua conta
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="usuario@empresa.com"
            className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all text-black text-sm placeholder:text-gray-400 shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all text-black text-sm placeholder:text-gray-400 shadow-sm"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          {erro && (
            <p className="text-red-500 text-[10px] font-bold text-center animate-pulse">
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 mt-2 text-sm"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-4 text-center space-y-1">
  <button
    type="button"
    className="text-blue-600 text-[11px] font-bold hover:underline"
  >
    Esqueceu sua senha?
  </button>

  <div className="pt-2 border-t border-gray-50">
    <p className="text-[10px] text-gray-400 uppercase tracking-tighter">
      Suporte: suporte@seudominio.com
    </p>
  </div>
</div>
      </div>

      {/* 3. BOTÃO DENÚNCIA: Estilo pílula no canto */}
      <div className="fixed bottom-6 right-6 z-20">
        <button
          onClick={() => setAbrirDenuncia(true)}
          className="bg-red-500 hover:bg-red-600 transition-all hover:scale-110 active:scale-90 text-white px-5 py-3 rounded-full shadow-lg font-bold text-xs flex items-center gap-2"
        >
        Canal de Denúncia
        </button>
      </div>

      {/* MODAL E TOAST */}
      <DenunciaModal
        aberto={abrirDenuncia}
        onClose={() => setAbrirDenuncia(false)}
        onSuccess={() => showToast("Denúncia enviada com sucesso!")}
      />

      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-8 py-3 rounded-full shadow-2xl font-bold z-[60] animate-in slide-in-from-top-10 text-xs">
          ✅ {toast}
        </div>
      )}
    </div>
  );
}