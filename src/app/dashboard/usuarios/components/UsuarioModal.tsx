"use client";

import { useState, useEffect } from "react";

interface Usuario {
  id?: number;
  name: string;
  email: string;
  cargo: string;
  perfil: "Colaborador" | "Gestor";
}

interface Empresa {
  id: number;
  name: string;
}

interface UsuarioModalProps {
  usuario?: Usuario | null;
  empresa: Empresa;
  onClose: () => void;
}

export default function UsuarioModal({ usuario, empresa, onClose }: UsuarioModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [perfil, setPerfil] = useState<"Colaborador" | "Gestor">("Colaborador");

  useEffect(() => {
    if (usuario) {
      setName(usuario.name);
      setEmail(usuario.email);
      setCargo(usuario.cargo);
      setPerfil(usuario.perfil);
    }
  }, [usuario]);

  const handleSave = () => {
    // Aqui você chamaria a API para salvar o usuário
    console.log("Salvando usuário:", { name, email, cargo, perfil, empresaId: empresa.id });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">{usuario ? "Editar Usuário" : "Novo Usuário"} - {empresa.name}</h2>

        <label className="block mb-2 font-medium">Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
        />

        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
        />

        <label className="block mb-2 font-medium">Cargo</label>
        <input
          type="text"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
        />

        <label className="block mb-2 font-medium">Perfil</label>
        <select
          value={perfil}
          onChange={(e) => setPerfil(e.target.value as "Colaborador" | "Gestor")}
          className="w-full border rounded-lg p-2 mb-4"
        >
          <option value="Colaborador">Colaborador</option>
          <option value="Gestor">Gestor</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
            Cancelar
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}