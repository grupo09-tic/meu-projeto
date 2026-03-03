# Termo de Abertura do Projeto (TAP) e Estrutura Analítica do Projeto (EAP) - Iniciais

## Termo de Abertura do Projeto (TAP) - Rascunho Inicial

### 1. Objetivo do Projeto:
Desenvolver uma plataforma de comunicação interna e feedback, com aplicação mobile para colaboradores e portal web para gestores/RH. O objetivo é centralizar a comunicação, facilitar a coleta de feedback seguro (inclusive anônimo) e garantir a confirmação de leitura ("ciente") de documentos importantes, aumentando o engajamento, a transparência e a conformidade organizacional.

### 2. Justificativa do Projeto:
A fragmentação da comunicação interna atual, a ineficiência na coleta de feedback honesto e a ausência de mecanismos formais de "ciente" para documentos críticos resultam em colaboradores desinformados, baixa moral, riscos de conformidade (e.g., LGPD) e dificuldades na tomada de decisões estratégicas por parte da gestão. Esta plataforma visa mitigar essas dores, proporcionando um ambiente de trabalho mais engajador, transparente, produtivo e em conformidade com as regulamentações.

### 3. Escopo do Projeto (MVP - Atualizado):

**3.1. DENTRO DO ESCOPO:**
*   **Aplicativo Mobile para Colaboradores:**
    *   Módulo de **Contracheques** e Documentos Pessoais.
    *   Mural de Avisos com confirmação de **Ciente**.
    *   Resposta de **Questionários** com vídeos de orientação obrigatórios.
    *   Canal de **Denúncias estritamente anônimas**.
*   **Portal Web para Gestores e RH:**
    *   Gestão hierárquica de documentos (Categoria > Subcategoria).
    *   Criação de questionários via **Templates** e gestão de recorrência.
    *   Acompanhamento de denúncias (seguimento restrito).
*   **Módulo ADM Geral (SuperAdmin):**
    *   Controle centralizado de **permissões e perfis de acesso**.

**3.2. FORA DO ESCOPO (para fases futuras ou outros sistemas):**
*   Gamificação, Módulos de Avaliação de Desempenho, Integração com Sistemas Legados (HRIS, folha de pagamento), Chat Interno ou Rede Social Corporativa, Módulo de Treinamento e Desenvolvimento, Funcionalidades Multi-tenant para Consultoria, Análise de Sentimento via IA, Dashboards Avançados/KPIs Personalizados, Notificações Customizáveis (avançadas), Edição de Documentos Online.

### 4. Principais Stakeholders:
*   **Colaboradores:** Usuários finais do aplicativo mobile. Buscam informação clara, canais de feedback seguros e transparência. (Representados pela Persona Ana Clara).
*   **Gestores de RH / Líderes de Equipe:** Usuários do portal web. Responsáveis pela comunicação, gestão de feedback e garantia de conformidade.
*   **Alta Direção:** Interessa-se pela melhoria do clima organizacional, aumento da produtividade, redução de riscos de comunicação e conformidade legal.
*   **Equipe de Desenvolvimento:** Responsáveis pela construção e manutenção da plataforma.

---

## Estrutura Analítica do Projeto (EAP) - Rascunho Inicial

A EAP é uma decomposição hierárquica do trabalho total a ser executado pela equipe do projeto para atingir os objetivos do projeto e criar os produtos finais.

**1. Gerenciamento do Projeto**
    1.1. Iniciação e Planejamento
        1.1.1. Elaboração e Aprovação do TAP
        1.1.2. Definição Detalhada da EAP e Cronograma
        1.1.3. Orçamento e Alocação de Recursos
    1.2. Gerenciamento de Requisitos
        1.2.1. Refinamento de RFs e RNFs do MVP
        1.2.2. Gestão de Backlog
    1.3. Gerenciamento de Comunicação e Stakeholders
    1.4. Gerenciamento de Riscos e Não Conformidades
    1.5. Acompanhamento, Controle e Relatórios de Progresso

**2. Design (UX/UI)**
    2.1. Análise e Levantamento de Requisitos de Experiência (Persona, Jornada)
    2.2. Criação de Wireframes e Fluxos de Navegação (App Mobile e Portal Web)
    2.3. Design Visual da Interface (UI)
        2.3.1. Paleta de Cores, Tipografia, Ícones
        2.3.2. Componentes de Interface
    2.4. Prototipagem Interativa (App Mobile e Portal Web)
    2.5. Validação de Usabilidade (Testes com Usuários)

**3. Desenvolvimento do Aplicativo Mobile (Colaborador)**
    3.1. Setup do Ambiente (React Native/Expo)
    3.2. Autenticação e Perfil (JWT e RBAC)
    3.3. Mural de Avisos com Sistema de "Ciente" (Registro de Data/Hora)
    3.4. Player de Vídeo para Orientação de Questionários (RF18)
    3.5. Formulários Híbridos (JSONB) para Questionários (RF19)
    3.6. Canal de Denúncia 100% Anônimo (Geração de Protocolo)
    3.7. Visualizador de PDF Seguro (Contracheques Individuais)

**4. Desenvolvimento do Portal Web (Gestor/RH)**
    4.1. Módulo ADM Geral Centralizador (Gestão de Rotinas e Permissões)
    4.2. Gestor de Conteúdo RH (Hierarquia: Categoria > Subcategoria > Descrição)
    4.3. Construtor de Questionários (Uso de Templates e Configuração de Recorrência)
    4.4. Painel de Seguimento de Denúncias (Sem Identificação do Autor)
    4.5. Monitor de "Cientes" e Relatórios de Conformidade

**5. Infraestrutura e Backend (Node.js/PostgreSQL)**
    5.1. Implementação do Banco de Dados Final (PostgreSQL)
        5.1.1. Estrutura Multi-tenant e Row Level Security (RLS)
        5.1.2. Implementação da Hierarquia de 3 Níveis (RH)
        5.1.3. Tabelas de Auditoria e Logs de Sistema
    5.2. Desenvolvimento das APIs REST
        5.2.1. API de Autenticação e Gestão de Perfis (RBAC Centralizado)
        5.2.2. API de Documentos e Contracheques (Upload Seguro)
        5.2.3. API de Questionários e Respostas (Suporte a JSONB)
        5.2.4. API de Denúncias (Criptografia e Isolamento de Protocolo)
    5.3. Configuração de Ambiente (Docker, CI/CD e Cloud)
    5.4. Segurança e LGPD (Criptografia em repouso e trânsito)

**6. Testes e Validação Final**
    6.1. Testes de Sistema (End-to-End)
    6.2. Testes de Performance e Carga
    6.3. Auditoria de Segurança
    6.4. Testes de Aceitação do Usuário (UAT)
    6.5. Preparação para Lançamento (Go-Live)
