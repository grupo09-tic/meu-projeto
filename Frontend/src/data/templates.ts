export const templates = [
  {
    id: "satisfacao",
    titulo: "Pesquisa de Satisfação",
    descricao: "Queremos melhorar nossos serviços",
    perguntas: [
      {
        titulo: "De 0 a 10, quanto você recomendaria?",
        tipo: "nps",
      },
      {
        titulo: "O que podemos melhorar?",
        tipo: "paragrafo",
      },
    ],
  },
  {
    id: "feedback",
    titulo: "Feedback de Produto",
    descricao: "Ajude a melhorar o sistema",
    perguntas: [
      {
        titulo: "Qual funcionalidade você mais usa?",
        tipo: "texto",
      },
      {
        titulo: "Encontrou algum problema?",
        tipo: "sim_nao",
      },
    ],
  },
  {
    id: "rapido",
    titulo: "Avaliação Rápida",
    descricao: "Leva menos de 1 minuto",
    perguntas: [
      {
        titulo: "Como foi sua experiência?",
        tipo: "emoji",
      },
    ],
  },
];
