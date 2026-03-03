# Mapeamento de Telas do MVP - Projeto Anexo Tecnologia

Este documento consolida todas as telas previstas para o Produto Mínimo Viável (MVP), divididas por plataforma e perfil de usuário.

---

## 📱 1. Aplicativo Mobile (Perfil: Colaborador)
Foco em usabilidade rápida, consumo de informação e conformidade.

1.  **Tela de Login:** 
    *   Campos de E-mail corporativo/CPF e Senha.
    *   Botão "Esqueci minha senha".
2.  **Dashboard / Home (Mural de Avisos):**
    *   Feed cronológico de comunicados (Cards com título, data e resumo).
    *   Destaque para avisos com "Ciente" pendente.
3.  **Visualização de Comunicado / Documento:**
    *   Conteúdo completo (texto rico, imagens, links).
    *   Botão flutuante ou fixo "Confirmar Ciência" (se aplicável).
4.  **Módulo de Questionários (Listagem):**
    *   Lista de pesquisas ativas divididas por categoria (Clima, PDI, Feedback).
    *   Indicador de progresso ou status (Pendente/Concluído).
5.  **Fluxo de Resposta (Subtelas):**
    *   **Tela de Orientação:** Player de vídeo obrigatório + instruções em texto.
    *   **Tela de Perguntas:** Interface limpa para perguntas de múltipla escolha e campos de texto livre.
    *   **Tela de Sucesso:** Mensagem de confirmação de envio.
6.  **Canal de Denúncia Anônima:**
    *   Texto explicativo sobre o sigilo.
    *   Formulário de relato e botão para anexo de arquivos.
    *   Exibição do protocolo gerado após o envio.
7.  **Módulo de RH (Navegação Hierárquica):**
    *   Lista de Categorias (Ex: Documentos Oficiais, Benefícios).
    *   Lista de Subcategorias (Ex: Contracheques, Manuais).
    *   Lista de Arquivos (PDFs) com opção de visualização.
8.  **Perfil do Usuário:**
    *   Dados básicos, troca de senha e histórico de interações (avisos lidos).

---

## 💻 2. Portal Web (Perfil: Gestor de RH / Líder)
Foco em gestão de dados, configuração do sistema e auditoria.

1.  **Dashboard Administrativo:**
    *   Gráficos rápidos: % de leitura de avisos, volume de denúncias por status, adesão aos questionários.
2.  **Gestão do Mural (Comunicados):**
    *   Lista de comunicados publicados.
    *   Formulário de criação (Título, Conteúdo, Público-alvo, Exigir Ciente).
3.  **Relatório de Conformidade (Cientes):**
    *   Lista de colaboradores que leram/não leram documentos específicos.
    *   Botão de exportação para CSV/Excel.
4.  **Central de Denúncias:**
    *   Visualização dos relatos (sem ID do autor).
    *   Alteração de status (Em Análise, Concluído) e inserção de notas internas.
5.  **Gestor de Questionários:**
    *   Escolha de templates (RF15).
    *   Configuração de datas de início/fim e anonimato.
    *   Funcionalidade de "Reaplicar" pesquisa anterior.
6.  **Gestão de Documentos (Estrutura RH):**
    *   Interface para organizar a árvore de 3 níveis (Categoria > Subcategoria > Documento).
    *   Upload massivo de contracheques vinculados ao CPF/ID do usuário.
7.  **Módulo ADM Geral (Centralizador de RBAC):**
    *   Cadastro/Importação de usuários.
    *   Configuração de Perfis (Ex: "Líder de Setor") e seleção de quais Rotinas eles podem acessar.

---

## 🌐 3. Módulo Super Admin (Anexo Tech)
Acesso exclusivo para a consultoria que gerencia a plataforma.

1.  **Gestão de Tenants:** Cadastro de novas empresas clientes e controle de licenças.
2.  **Configuração de Rotinas Globais:** Cadastro de novas funcionalidades que podem ser liberadas para os clientes.
