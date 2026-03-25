"use client";

import { useState, useEffect } from "react";

interface Empresa {
  id?: number;
  name: string;
  status: "Ativo" | "Inativo";
}

interface EmpresaModalProps {
  empresa?: Empresa | null;
  onClose: () => void;
}

export default function EmpresaModal({ empresa, onClose }: EmpresaModalProps) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"Ativo" | "Inativo">("Ativo");

  useEffect(() => {
    if (empresa) {
      setName(empresa.name);
      setStatus(empresa.status);
    }
  }, [empresa]);

  const handleSave = () => {
    // Aqui você pode chamar API para salvar a empresa
    console.log("Salvando empresa:", { name, status });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">{empresa ? "Editar Empresa" : "Nova Empresa"}</h2>

        <label className="block mb-2 font-medium">Nome da Empresa</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
        />

        <label className="block mb-2 font-medium">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "Ativo" | "Inativo")}
          className="w-full border rounded-lg p-2 mb-4"
        >
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
            Cancelar
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}