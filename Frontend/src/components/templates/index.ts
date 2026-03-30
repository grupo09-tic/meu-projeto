import { Questionario } from "../QuestionEditor";

export const templateSatisfacaoCliente: Questionario = {
  id: crypto.randomUUID(),
  titulo: "Pesquisa de Satisfação do Cliente",
  descricao: "Queremos ouvir sua opinião sobre nosso serviço.",
  inicio: new Date().toISOString().split("T")[0],
  fim: "",
  perguntas: [
    {
      id: crypto.randomUUID(),
      titulo: "Como você avalia nosso atendimento?",
      tipo: "multipla_escolha",
      obrigatoria: true,
      opcoes: ["😍 Excelente", "🙂 Boa", "😐 Média", "😡 Ruim"],
    },
    {
      id: crypto.randomUUID(),
      titulo: "O produto atendeu suas expectativas?",
      tipo: "sim_nao",
      obrigatoria: true,
    },
    {
      id: crypto.randomUUID(),
      titulo: "Deixe um comentário ou sugestão",
      tipo: "paragrafo",
      obrigatoria: false,
    },
  ],
};

export const templates: Questionario[] = [templateSatisfacaoCliente];