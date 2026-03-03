# Guia para a Atividade 3: Caso de Uso, Arquitetura e Tecnologias

Olá, equipe! Esta semana é fundamental para transformarmos os requisitos que levantamos em um plano técnico concreto. Vamos definir o esqueleto do nosso sistema.

Este guia vai orientar vocês em cada uma das tarefas.

---

### 1. Consolidação dos Requisitos Funcionais

**O que é?**
É o momento de refinar e organizar a lista de funcionalidades que o sistema deve ter, com base no que foi definido no MVP. A lista deve ser clara, sem ambiguidades e estável para que possamos trabalhar nela.

**Como fazer?**
1.  **Revisão:** Leiam cada requisito levantado na Atividade 2. Ele está claro? É testável? Representa uma única função? (Ex: "O usuário deve poder fazer login" é melhor do que "O usuário gerencia sua conta").
2.  **Organização:** Agrupem os requisitos por módulo ou por perfil de usuário (Colaborador, Gestor de RH). Priorizem o que é essencial para o MVP.
3.  **Documentação:** Crie uma tabela simples com colunas como: `ID` (ex: RF-001), `Descrição`, `Prioridade (MVP)`, `Perfil de Usuário`.
4.  **Justificativa:** Se mudarem ou descartarem algum requisito, escrevam um parágrafo explicando o porquê. A decisão foi técnica? De escopo?

**Dica de Mentor:** Pensem em cada requisito como um item que vocês podem marcar como "feito" no futuro. Se a descrição for vaga, será impossível saber quando a tarefa terminou.

---

### 2. Diagrama de Caso de Uso (UML)

**O que é?**
É um diagrama visual que mostra as interações entre os usuários (atores) e o sistema. Ele responde de forma simples à pergunta: "Quem pode fazer o quê no nosso sistema?".

**Como fazer?**
1.  **Identificar Atores:** Listem quem vai usar o sistema. Baseiem-se nas Personas que vocês criaram (ex: Colaborador, Gestor de RH, Super Admin).
2.  **Identificar Casos de Uso:** Transformem seus requisitos funcionais em ações que os atores realizam (ex: `RF-001: O usuário deve poder fazer login` vira o caso de uso `Fazer Login`). Foquem apenas nos requisitos do MVP.
3.  **Desenhar o Diagrama:**
    *   Use uma ferramenta online (como Lucidchart, diagrams.net, ou Whimsical).
    *   Desenhe um retângulo grande: a **fronteira do sistema**.
    *   Coloque os bonecos (atores) do lado de fora.
    *   Coloque as elipses (casos de uso) dentro da fronteira.
    *   Ligue os atores aos casos de uso que eles podem executar.
4.  **Descrição:** Abaixo do diagrama, escreva uma ou duas frases descrevendo cada caso de uso principal.

**Dica de Mentor:** Mantenham o diagrama simples. Usem as relações `<<include>>` e `<<extend>>` com moderação. O objetivo é clareza, não complexidade. O diagrama deve ser um mapa fácil de ler das funcionalidades do MVP.

---

### 3. Definição da Arquitetura da Aplicação

**O que é?**
É o projeto técnico de alto nível do sistema. A arquitetura é a planta baixa que mostra como as diferentes partes do software serão organizadas e como elas se comunicarão.

**Como fazer?**
1.  **Definir os Componentes:** Com base nos requisitos, sabemos que precisamos de:
    *   Uma **Aplicação Mobile** para o Colaborador.
    *   Um **Portal Web** para o Gestor de RH e Admin.
    *   Um "cérebro" central que contém as regras e os dados: o **Backend (API)**.
    *   Um lugar para guardar os dados: o **Banco de Dados**.
2.  **Desenhar a Estrutura:** Crie um diagrama de blocos simples.
    *   Desenhe uma caixa para o "Mobile App" e uma para o "Web Portal". Elas são a **Camada de Apresentação (Frontend)**.
    *   Desenhe uma caixa central para a **Camada de Aplicação (Backend/API)**. Conecte os frontends a ela. A comunicação será via **API REST**.
    *   Desenhe uma caixa final para a **Camada de Dados (Banco de Dados)** e conecte o backend a ela.
3.  **Explicar:** Descreva o papel de cada caixa. Ex: "O Backend é uma API REST que centraliza toda a lógica de negócio, como autenticação, gestão de pesquisas e processamento de feedbacks. Ele se comunica com o banco de dados e serve os dados para o app mobile e o portal web."
4.  **Justificativa:** Explique por que essa arquitetura foi escolhida. (Ex: "A arquitetura em camadas com uma API central permite que múltiplos clientes (web e mobile) consumam os mesmos dados e regras de forma independente, facilitando a manutenção e a escalabilidade.").

**Dica de Mentor:** Não compliquem. Uma arquitetura de 3 camadas (Apresentação, Lógica, Dados) é um padrão excelente e robusto para começar. O importante é entender o papel de cada parte.

---

### 4. Tecnologias Escolhidas

**O que é?**
É a lista de ferramentas, linguagens e frameworks que vocês usarão para construir cada parte da arquitetura definida.

**Como fazer?**
Para cada componente da arquitetura, escolham e justifiquem a tecnologia:
1.  **Backend (API):**
    *   **Linguagem/Framework:** Sugestões: Node.js (com Express ou NestJS), Python (com Django ou FastAPI), Java (com Spring Boot).
    *   **Justificativa:** Pensem na familiaridade da equipe, no ecossistema da linguagem e na performance.
2.  **Frontend (Portal Web):**
    *   **Framework:** Sugestões: React, Angular, Vue.js.
    *   **Justificativa:** Considerem a popularidade, a curva de aprendizado e a integração com bibliotecas de componentes.
3.  **Mobile (App):**
    *   **Tecnologia:** Sugestões: React Native, Flutter (ambos multiplataforma), ou Nativo (Kotlin para Android, Swift para iOS).
    *   **Justificativa:** Multiplataforma (um código para ambos os SOs) é geralmente mais rápido para um MVP.
4.  **Banco de Dados:**
    *   **Tipo:** SQL (Relacional, ex: PostgreSQL, MySQL) ou NoSQL (Documento, ex: MongoDB).
    *   **Justificativa:** Para dados estruturados com relações claras (usuários, pesquisas, respostas), um banco SQL como o **PostgreSQL** é uma escolha muito segura e tradicional.
5.  **Versionamento:**
    *   **Ferramenta:** Git.
    *   **Plataforma:** GitHub, GitLab ou Bitbucket. Crie o repositório!

**Dica de Mentor:** Não escolham uma tecnologia porque é "nova" ou "legal". Escolham porque ela resolve bem o *seu* problema e porque a equipe se sente produtiva com ela. Façam uma pequena tabela comparando 1 ou 2 alternativas para as escolhas principais.

---

### 5. Modelo de Dados Inicial

**O que é?**
É um rascunho de como os dados serão estruturados no banco de dados. Ele define as "tabelas" (entidades) principais, seus "campos" (atributos) e como elas se conectam.

**Como fazer?**
1.  **Identificar Entidades:** Quais são os substantivos principais do seu sistema? Ex: `Empresa`, `Colaborador`, `Gestor`, `Pesquisa`, `Pergunta`, `Resposta`, `Feedback`.
2.  **Definir Atributos:** Para cada entidade, liste as informações que ela precisa guardar. Ex: `Colaborador` tem `id`, `nome`, `email`, `senha_hash`, `empresa_id`.
3.  **Estabelecer Relacionamentos:** Como as entidades se conectam?
    *   Uma `Empresa` tem muitos `Colaboradores`. (1-N)
    *   Um `Gestor` cria muitas `Pesquisas`. (1-N)
    *   Uma `Pesquisa` tem muitas `Perguntas`. (1-N)
    *   Um `Colaborador` envia muitas `Respostas`. (1-N)
4.  **Desenhar o Diagrama:** Crie um Diagrama de Entidade-Relacionamento (DER). Use uma ferramenta online para desenhar caixas para as entidades e linhas para os relacionamentos.

**Dica de Mentor:** Este é um modelo *inicial*. Ele não precisa ser perfeito ou completo. Foque nas entidades e relações mais óbvias e importantes para o MVP. Ele vai evoluir conforme o desenvolvimento avança.

---

### 6. Atualização do TAP e da EAP

**O que é?**
Agora que as decisões técnicas estão mais claras, é hora de atualizar a documentação de gerenciamento do projeto para refletir a realidade.

**Como fazer?**
1.  **TAP (Termo de Abertura do Projeto):** Releiam o TAP. A descrição do produto ou os riscos precisam de algum ajuste com base na arquitetura e tecnologias escolhidas? Geralmente são pequenas mudanças.
2.  **EAP (Estrutura Analítica do Projeto):** Esta é a principal atualização. O trabalho agora pode ser quebrado em pacotes técnicos reais. Usem a arquitetura como guia para criar a nova estrutura.
    *   **Exemplo de EAP:**
        *   1.0 Gerenciamento do Projeto
        *   2.0 Design (UI/UX)
        *   3.0 Desenvolvimento do Backend (API)
            *   3.1 Configuração do Ambiente
            *   3.2 Módulo de Autenticação (Login, Perfis)
            *   3.3 Módulo de Empresas (CRUD de empresas)
            *   3.4 Módulo de Pesquisas (CRUD de pesquisas e perguntas)
        *   4.0 Desenvolvimento do Frontend (Portal Web)
            *   4.1 Tela de Login
            *   4.2 Dashboard do Gestor
        *   5.0 Desenvolvimento do App Mobile
            *   ...
        *   6.0 Implantação e Testes

**Dica de Mentor:** A EAP é a sua lista de tarefas macro. Cada item da EAP pode ser quebrado em várias tarefas menores no seu board (Trello, Jira, etc.). Uma boa EAP garante que nada importante seja esquecido no planejamento.

---

Lembrem-se de consolidar tudo em um único documento, com as evidências (diagramas, listas, justificativas) logo abaixo de cada tarefa. Bom trabalho!
