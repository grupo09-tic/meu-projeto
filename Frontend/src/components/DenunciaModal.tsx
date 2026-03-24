"use client";

import { useState, FormEvent } from "react";

type Props = {
  aberto: boolean;      // controla se o modal está visível
  onClose: () => void;  // função para fechar o modal
  onSuccess: () => void;// função chamada ao enviar com sucesso
};

export default function DenunciaModal({ aberto, onClose, onSuccess }: Props) {

  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [arquivos, setArquivos] = useState<File[]>([]);

  // Configurações de upload
  const MAX_ARQUIVOS = 5;
  const TIPOS_PERMITIDOS = ["application/pdf", "image/jpeg", "image/png"];

  if (!aberto) return null;

  // Limpa todos os campos do formulário
  const limparCampos = () => {
    setAssunto("");
    setMensagem("");
    setErro("");
    setArquivos([]);
  };

  // Fecha o modal + limpa os dados
  const handleClose = () => {
    limparCampos();
    onClose();
  };

  // Manipula seleção de arquivos
  const handleArquivos = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const novos = Array.from(e.target.files);

    // filtra apenas arquivos permitidos
    const validos = novos.filter((file) =>
      TIPOS_PERMITIDOS.includes(file.type)
    );

    // alerta se algum arquivo foi ignorado
    if (validos.length !== novos.length) {
      alert("Alguns arquivos foram ignorados (apenas PDF, JPG e PNG)");
    }

    const total = [...arquivos, ...validos];

    // valida quantidade máxima
    if (total.length > MAX_ARQUIVOS) {
      alert(`Máximo de ${MAX_ARQUIVOS} arquivos`);
      return;
    }

    setArquivos(total);
  };

  // Remove arquivo da lista
  const removerArquivo = (index: number) => {
    setArquivos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErro("");

    if (!assunto || !mensagem) {
      setErro("Preencha os campos obrigatórios");
      return;
    }

    const denuncia = { assunto, mensagem, arquivos, anonimo: true };
    console.log(denuncia);

    onSuccess();   // dispara ação de sucesso
    handleClose(); // limpa e fecha modal
  };

  return (
    // fundo escuro
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      
      {/* CONTAINER DO MODAL - max-w-2xl no mobile e max-w-4xl no desktop */}
    
      <div className="bg-white w-full max-w-2xl md:max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* CABEÇALHO */}
        <div className="bg-red-600 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Canal de Denúncia</h2>
            <p className="text-red-100 text-sm">
              Esta denúncia é 100% anônima. Nenhuma informação pessoal será coletada.
            </p>
          </div>

          {/* Botão fechar */}
          <button 
            onClick={handleClose}
            className="hover:bg-red-700 p-2 rounded-full transition-colors"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-5">

          {/* CAMPO ASSUNTO */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Assunto *
            </label>
            <input
              type="text"
              placeholder="Ex: Conduta inadequada, infração de segurança..."
              value={assunto}
              onChange={(e) => setAssunto(e.target.value)}
              className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-black"
            />
          </div>

          {/* CAMPO DESCRIÇÃO */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Descrição Detalhada *
            </label>
            <textarea
              placeholder="Descreva o ocorrido..."
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              className="p-3 border border-gray-200 rounded-xl h-32 focus:ring-2 focus:ring-red-500 outline-none text-black resize-none"
            />
          </div>

          {/* MENSAGEM DE ERRO */}
          {erro && (
            <p className="text-red-500 text-sm font-medium">{erro}</p>
          )}

          {/* ANEXOS */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-300">
            
            <label className="text-sm font-semibold text-gray-700 mb-3 block">
              Anexar evidências (Opcional)
            </label>

            {/* Botão de upload */}
            <label className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-xl cursor-pointer shadow-sm text-gray-700 font-medium">
              📎 Selecionar arquivos

              {/* key força reset visual ao limpar */}
              <input
                key={arquivos.length}
                type="file"
                multiple
                className="hidden"
                onChange={handleArquivos}
              />
            </label>

            {/* Lista de arquivos */}
            {arquivos.length > 0 && (
              <div className="mt-4 grid grid-cols-1 gap-2">
                {arquivos.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm"
                  >
                    <span className="text-sm text-gray-600 truncate max-w-[80%]">
                      {file.name}
                    </span>

                    <button
                      type="button"
                      onClick={() => removerArquivo(index)}
                      className="text-red-500 hover:text-red-700 text-xs font-bold"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* BOTÕES */}
          <div className="flex justify-end gap-3 pt-4">
            
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 border border-gray-300 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all"
            >
              Cancelar
            </button>

            <button 
              type="submit"
              className="px-10 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95"
            >
              Enviar Denúncia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}