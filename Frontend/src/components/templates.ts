import { Questionario } from "./QuestionEditor";

export const templates: Questionario[] = [
  {
    id: "1",
    titulo: "Pesquisa de Satisfação",
    descricao: "Avalie nossa empresa e serviços",
    perguntas: [
      { id: "p1", titulo: "Como você avalia nosso atendimento?", tipo: "multipla_escolha", obrigatoria: true, opcoes: ["😍 Excelente", "🙂 Boa", "😐 Média", "😡 Ruim"] },
      { id: "p2", titulo: "Comentários adicionais", tipo: "paragrafo", obrigatoria: false },
    ],
  },
  {
    id: "2",
    titulo: "Feedback de Produto",
    descricao: "Nos conte sua experiência com o produto",
    perguntas: [
      { id: "p1", titulo: "O produto atendeu suas expectativas?", tipo: "sim_nao", obrigatoria: true },
      { id: "p2", titulo: "Sugestões de melhoria", tipo: "paragrafo", obrigatoria: false },
    ],
  },
  {
    id: "3",
    titulo: "Avaliação de Treinamento",
    descricao: "Sua opinião sobre o treinamento recebido",
    perguntas: [
      { id: "p1", titulo: "O conteúdo foi relevante?", tipo: "multipla_escolha", obrigatoria: true, opcoes: ["Sim", "Não"] },
      { id: "p2", titulo: "Avalie o instrutor", tipo: "nps", obrigatoria: false },
    ],
  },
  {
    id: "4",
    titulo: "Formulário de Registro",
    descricao: "Coletar informações iniciais do usuário",
    perguntas: [
      { id: "p1", titulo: "Nome completo", tipo: "texto", obrigatoria: true },
      { id: "p2", titulo: "E-mail", tipo: "texto", obrigatoria: true },
    ],
  },
  {
    id: "5",
    titulo: "Pesquisa de Clima",
    descricao: "Avalie o ambiente de trabalho",
    perguntas: [
      { id: "p1", titulo: "Você se sente valorizado?", tipo: "sim_nao", obrigatoria: true },
      { id: "p2", titulo: "Como avalia a comunicação interna?", tipo: "multipla_escolha", obrigatoria: true, opcoes: ["Ótima", "Boa", "Regular", "Ruim"] },
    ],
  },
  {
    id: "6",
    titulo: "Questionário de Saúde",
    descricao: "Informações de saúde e bem-estar",
    perguntas: [
      { id: "p1", titulo: "Você pratica exercícios?", tipo: "sim_nao", obrigatoria: false },
      { id: "p2", titulo: "Quantas horas de sono por noite?", tipo: "texto", obrigatoria: false },
    ],
  },
  {
    id: "7",
    titulo: "Pesquisa de Eventos",
    descricao: "Sua opinião sobre eventos realizados",
    perguntas: [
      { id: "p1", titulo: "O evento atendeu suas expectativas?", tipo: "multipla_escolha", obrigatoria: true, opcoes: ["Sim", "Não"] },
      { id: "p2", titulo: "Avalie a organização", tipo: "nps", obrigatoria: false },
    ],
  },
  {
    id: "8",
    titulo: "Pesquisa de Marketing",
    descricao: "Conheça o perfil do público-alvo",
    perguntas: [
      { id: "p1", titulo: "Como você conheceu nossa marca?", tipo: "multipla_escolha", obrigatoria: true, opcoes: ["Redes Sociais", "Indicação", "Pesquisa online", "Outro"] },
      { id: "p2", titulo: "Você recomendaria nossos serviços?", tipo: "sim_nao", obrigatoria: true },
    ],
  },
  {
    id: "9",
    titulo: "Avaliação de Suporte",
    descricao: "Opinião sobre o atendimento ao cliente",
    perguntas: [
      { id: "p1", titulo: "O problema foi resolvido?", tipo: "sim_nao", obrigatoria: true },
      { id: "p2", titulo: "Avalie a cordialidade do atendente", tipo: "multipla_escolha", obrigatoria: false, opcoes: ["Excelente", "Boa", "Regular", "Ruim"] },
    ],
  },
  {
    id: "10",
    titulo: "Formulário de Inscrição",
    descricao: "Inscrição em cursos ou workshops",
    perguntas: [
      { id: "p1", titulo: "Nome completo", tipo: "texto", obrigatoria: true },
      { id: "p2", titulo: "E-mail", tipo: "texto", obrigatoria: true },
      { id: "p3", titulo: "Curso desejado", tipo: "multipla_escolha", obrigatoria: true, opcoes: ["React", "Next.js", "TypeScript", "Tailwind"] },
    ],
  },
];