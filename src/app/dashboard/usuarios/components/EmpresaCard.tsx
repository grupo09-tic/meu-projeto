"use client";

import { FC } from "react";
import { Empresa } from "./Usuario";

interface EmpresaCardProps {
  empresa: Empresa;
  onSelect: () => void;
  onEdit: () => void;
}

const EmpresaCard: FC<EmpresaCardProps> = ({ empresa, onSelect, onEdit }) => {
  return (
    <div
      className={`p-4 rounded-xl shadow cursor-pointer transition hover:shadow-lg ${
        empresa.status === "Ativo" ? "bg-green-100" : "bg-red-100"
      }`}
      onClick={onSelect}
    >
      <h3 className="font-semibold text-lg">{empresa.name}</h3>
      <p className="text-sm text-gray-700">{empresa.usuarios.length} usuário(s)</p>
      <p className="text-sm">{empresa.status}</p>

      <button
        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
        onClick={(e) => {
          e.stopPropagation(); // evita disparar onSelect
          onEdit();
        }}
      >
        Editar
      </button>
    </div>
  );
};

export default EmpresaCard;