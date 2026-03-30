export type TipoPergunta =
  | "texto"
  | "paragrafo"
  | "multipla"
  | "nps"
  | "sim_nao"
  | "emoji";

export interface Opcao {
  id: string;
  texto: string;
}

export interface Pergunta {
  id: string;
  titulo: string;
  tipo: TipoPergunta;
  obrigatoria: boolean;
  opcoes?: Opcao[];
}

export interface Questionario {
  titulo: string;
  descricao: string;
  perguntas: Pergunta[];
}