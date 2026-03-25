"use client";

import { FC } from "react";
import { Usuario } from "./Usuario";

interface UsuarioRowProps {
  usuario: Usuario;
  onEdit: () => void;
}

const UsuarioRow: FC<UsuarioRowProps> = ({ usuario, onEdit }) => {
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="p-2">{usuario.name}</td>
      <td className="p-2">{usuario.cargo}</td>
      <td className="p-2">{usuario.email}</td>
      <td className="p-2">{usuario.perfil}</td>
      <td className="p-2">
        <button
          onClick={onEdit}
          className="px-2 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
        >
          Editar
        </button>
      </td>
    </tr>
  );
};

export default UsuarioRow;