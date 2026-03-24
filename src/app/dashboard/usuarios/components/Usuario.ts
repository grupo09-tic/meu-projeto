// src/app/dashboard/usuarios/components/Usuario.ts
export interface Usuario {
  id: number;
  name: string;
  email: string;
  cargo: string;
  perfil: "Colaborador" | "Gestor";
}

export interface Empresa {
  id: number;
  name: string;
  status: "Ativo" | "Inativo";
  usuarios: Usuario[];
}