# Guia para a Atividade 4: Consolidação e Início da Execução

Olá, equipe! Esta é a semana em que o **Projeto Proton (projeto55)** ganha vida. Vamos encerrar o planejamento formal e iniciar a construção técnica.

---

### 1. Finalização do TAP (Termo de Abertura)
O TAP é o "contrato" do projeto. Precisamos garantir que ele reflita as decisões tomadas na Atividade 3 (Multi-tenancy, RBAC, Anonimato Real).
*   **Ação:** Revisar o arquivo `tap_eap_iniciais.md`.
*   **Check:** O escopo inclui o Módulo de RH (3 níveis) e os Questionários com vídeo?

### 2. Finalização da EAP (Estrutura Analítica)
A EAP deve ser técnica. Ela não é apenas "fazer o app", mas "Desenvolver API de Autenticação", "Criar Schema do Banco", etc.
*   **Ação:** Detalhar os pacotes de trabalho por tecnologia (Backend, Frontend Web, Mobile).

### 3. Wireframes (Desenho das Telas)
Vocês precisam desenhar a estrutura funcional. Foco no MVP:
1.  **Tela Inicial (Login/Dashboard):** Diferente para Colaborador (Mobile) e RH (Web).
2.  **Fluxo de Resposta de Questionário:** Vídeo -> Perguntas -> Confirmação.
3.  **Mural/Documentos:** Navegação na hierarquia de 3 níveis.
4.  **Canal de Denúncia:** Formulário anônimo e geração de protocolo.

### 4. Banco de Dados (O Script!)
Não basta o diagrama, agora precisamos do código SQL que cria as tabelas no PostgreSQL.
*   **Dica:** Usem o arquivo `schema_inicial_projeto55.sql` que vamos gerar como base.

### 5. Repositório e Board
*   **GitHub/GitLab:** Criar a estrutura de pastas (`/backend`, `/frontend`, `/mobile`, `/docs`).
*   **README.md:** Deve conter a explicação da arquitetura e como rodar o projeto.
*   **Board (Trello/Jira):** Mover as tarefas de "To Do" para "In Progress".

### 6. Diagrama de Classes (Com Métodos)
O diagrama agora precisa mostrar a inteligência:
*   `Usuario.autenticar()`
*   `Denuncia.gerarProtocolo()`
*   `Questionario.reaplicar()`
*   `Documento.registrarCiencia()`

---

**Lembrete de Mentor:** Documentem as contribuições de cada um na tabela final. Evidências (prints e links) são obrigatórias para a nota!
