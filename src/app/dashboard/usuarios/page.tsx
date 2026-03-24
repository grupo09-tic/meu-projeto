"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import EmpresaCard from "./components/EmpresaCard";
import EmpresaModal from "./components/EmpresaModal";
import UsuarioRow from "./components/UsuarioRow";
import UsuarioModal from "./components/UsuarioModal";
import { Usuario, Empresa } from "./components/Usuario";

// Mock de dados
const empresasMock: Empresa[] = [
  {
    id: 1,
    name: "Empresa A",
    status: "Ativo",
    usuarios: [
      { id: 1, name: "Ana Lacerda", email: "ana@a.com", cargo: "Gestor", perfil: "Gestor" },
      { id: 2, name: "João Silva", email: "joao@a.com", cargo: "Colaborador", perfil: "Colaborador" },
    ],
  },
  { id: 2, name: "Empresa B", status: "Inativo", usuarios: [] },
];

export default function UsuariosPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>(empresasMock);
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);
  const [empresaModalOpen, setEmpresaModalOpen] = useState(false);
  const [usuarioModalOpen, setUsuarioModalOpen] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);

  const user = { role: "SuperAdmin" }; // Mock do usuário logado

  // Seleciona automaticamente a primeira empresa
  useEffect(() => {
    if (empresas.length > 0 && !selectedEmpresa) {
      setSelectedEmpresa(empresas[0]);
    }
  }, [empresas, selectedEmpresa]);

  if (user.role !== "SuperAdmin") {
    return <div className="text-center mt-20 text-red-500">Acesso negado. Apenas SuperAdmin.</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Header />

      {/* Lista de Empresas */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Empresas</h2>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => {
            setSelectedEmpresa(null);
            setEmpresaModalOpen(true);
          }}
        >
          Criar nova empresa
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {empresas.map((empresa) => (
          <EmpresaCard
            key={empresa.id}
            empresa={empresa}
            onSelect={() => setSelectedEmpresa(empresa)}
            onEdit={() => {
              setSelectedEmpresa(empresa);
              setEmpresaModalOpen(true);
            }}
          />
        ))}
      </div>

      {/* Lista de Usuários da Empresa Selecionada */}
      {selectedEmpresa ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Usuários de {selectedEmpresa.name}</h2>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              onClick={() => {
                setSelectedUsuario(null);
                setUsuarioModalOpen(true);
              }}
            >
              Criar novo usuário
            </button>
          </div>

          {selectedEmpresa.usuarios.length === 0 ? (
            <p className="text-gray-500 mb-4">Nenhum usuário cadastrado.</p>
          ) : (
            <div className="bg-white rounded-xl shadow overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">Nome</th>
                    <th className="p-2 text-left">Cargo</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Perfil</th>
                    <th className="p-2 text-left">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedEmpresa.usuarios.map((usuario) => (
                    <UsuarioRow
                      key={usuario.id}
                      usuario={usuario}
                      onEdit={() => {
                        setSelectedUsuario(usuario);
                        setUsuarioModalOpen(true);
                      }}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">Selecione uma empresa para ver os usuários.</p>
      )}

      {/* Modais */}
      {empresaModalOpen && (
        <EmpresaModal
          empresa={selectedEmpresa}
          onClose={() => {
            setEmpresaModalOpen(false);
            setSelectedEmpresa(null);
          }}
        />
      )}

      {usuarioModalOpen && selectedEmpresa && (
        <UsuarioModal
          usuario={selectedUsuario}
          empresa={selectedEmpresa}
          onClose={() => {
            setUsuarioModalOpen(false);
            setSelectedUsuario(null);
          }}
        />
      )}
    </div>
  );
}