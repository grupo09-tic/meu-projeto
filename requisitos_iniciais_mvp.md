# Requisitos Iniciais - MVP da Plataforma de Comunicação e Feedback

Este documento detalha os Requisitos Funcionais (RF) e Requisitos Não Funcionais (RNF) para o Produto Mínimo Viável (MVP) da plataforma.

## Requisitos Funcionais (RF)

### Funcionalidades do Aplicativo Mobile (Colaborador):

*   **RF001 - Autenticação:** O sistema DEVE permitir que um colaborador realize login utilizando seu e-mail corporativo e uma senha previamente cadastrada.
*   **RF002 - Visualização de Feed de Comunicados:** O sistema DEVE exibir um feed cronológico de comunicados oficiais da empresa no aplicativo mobile.
*   **RF003 - Detalhes do Comunicado:** O sistema DEVE permitir que o colaborador visualize o conteúdo completo de um comunicado selecionado, incluindo título, corpo de texto e imagens simples (se houver).
*   **RF004 - Identificação de Comunicado Obrigatório:** O sistema DEVE indicar visualmente se um comunicado requer confirmação de leitura ("ciente").
*   **RF005 - Confirmação de Leitura ("Ciente"):** O sistema DEVE exibir um botão "Li e Concordo" ou "Ciente" para comunicados marcados como obrigatórios. Ao ser clicado, o sistema DEVE registrar a confirmação de leitura.
*   **RF006 - Envio de Feedback:** O sistema DEVE permitir que o colaborador envie um feedback, sugestão ou denúncia por meio de um formulário de texto livre.
*   **RF007 - Opção de Anonimato:** O sistema DEVE oferecer uma opção clara para o colaborador enviar o feedback de forma anônima.

### Funcionalidades do Portal Web (Gestor de RH / Líder de Equipe):

*   **RF008 - Autenticação de Usuário:** O sistema DEVE permitir que qualquer usuário realize login utilizando suas credenciais, sendo redirecionado às funcionalidades permitidas por seu perfil.
*   **RF009 - Gestão de Perfis de Acesso (RBAC):** O sistema DEVE permitir a criação de perfis customizados, onde se define quais rotinas (funcionalidades) o usuário vinculado àquele perfil pode acessar/executar.
*   **RF010 - Gestão de Usuários da Empresa:** O sistema DEVE permitir que um administrador da empresa cadastre novos usuários e os vincule a um Perfil de Acesso previamente criado.
*   **RF011 - Criação e Publicação de Comunicados:** O sistema DEVE permitir que usuários com permissão criem novos comunicados (título e corpo de texto) e os publiquem.
*   **RF012 - Definição de "Ciente" Obrigatório:** O sistema DEVE permitir que se marque um comunicado como "requer ciente" no momento da publicação.
*   **RF013 - Listagem de Comunicados Publicados:** O sistema DEVE exibir uma lista de todos os comunicados publicados pela empresa.
*   **RF014 - Visualização de Feedbacks:** O sistema DEVE exibir uma lista dos feedbacks recebidos, respeitando as permissões de acesso do perfil.
*   **RF015 - Identificação de Anonimato:** O sistema DEVE indicar claramente se o feedback foi anônimo ou identificado.

### Funcionalidades de Administração Global (SuperAdmin - Anexo Tech):

*   **RF016 - Gestão Multi-tenant (Empresas):** O sistema DEVE permitir que o SuperAdmin cadastre, edite e gerencie as diferentes empresas (clientes) que utilizam a plataforma.
*   **RF017 - Gestão de Rotinas do Sistema:** O sistema DEVE permitir que o SuperAdmin defina quais rotinas estão disponíveis globalmente para serem atribuídas aos perfis pelas empresas clientes.

## Requisitos Não Funcionais (RNF)

*   **RNF001 - Desempenho:**
    *   **RNF001.1:** O tempo de carregamento de todas as telas principais do aplicativo mobile e do portal web NÃO DEVE exceder 3 segundos em condições de rede de 4G/Wi-Fi estáveis.
    *   **RNF001.2:** As operações de login, publicação de comunicado e envio de feedback NÃO DEVEM exceder 2 segundos para serem concluídas.
*   **RNF002 - Segurança:**
    *   **RNF002.1:** Todas as comunicações entre o aplicativo mobile/portal web e o servidor DEVE ocorrer via protocolo HTTPS/SSL, garantindo a criptografia dos dados em trânsito.
    *   **RNF002.2:** As senhas dos usuários DEVE ser armazenadas de forma segura no banco de dados, utilizando algoritmos de hash criptográficos (e.g., bcrypt) com "salt".
    *   **RNF002.3:** O sistema DEVE implementar controle de acesso baseado em função (RBAC), garantindo que colaboradores e gestores/RH acessem apenas as funcionalidades pertinentes aos seus perfis.
    *   **RNF002.4:** Para feedbacks enviados anonimamente, o sistema DEVE garantir tecnicamente que não seja possível rastrear a identidade do colaborador que o enviou.
    *   **RNF002.5:** O sistema DEVE estar em conformidade com os princípios gerais da LGPD (Lei Geral de Proteção de Dados).
*   **RNF003 - Usabilidade:**
    *   **RNF003.1:** A interface do aplicativo mobile DEVE ser intuitiva e fácil de navegar para um público diverso de colaboradores.
    *   **RNF003.2:** O processo de envio de feedback no aplicativo DEVE ser concluído em no máximo 3 toques/cliques.
    *   **RNF003.3:** A interface do portal web DEVE ser clara e eficiente para as tarefas de criação e gerenciamento de comunicados e feedbacks.
*   **RNF004 - Escalabilidade:**
    *   **RNF004.1:** O sistema DEVE ser capaz de suportar até 500 usuários ativos simultaneamente sem degradação perceptível de desempenho.
    *   **RNF004.2:** A arquitetura do sistema DEVE permitir a fácil expansão para acomodar um crescimento futuro de usuários e funcionalidades.
*   **RNF005 - Compatibilidade:**
    *   **RNF005.1:** O aplicativo mobile DEVE ser compatível com as duas últimas versões principais dos sistemas operacionais iOS e Android.
    *   **RNF005.2:** O portal web DEVE ser compatível com as duas últimas versões dos navegadores Google Chrome, Mozilla Firefox, Microsoft Edge e Safari.
*   **RNF006 - Manutenibilidade:**
    *   **RNF006.1:** O código-fonte do sistema DEVE ser modular, bem estruturado e seguir padrões de codificação reconhecidos.
    *   **RNF006.2:** A documentação técnica do sistema DEVE ser clara, atualizada e suficiente para facilitar a manutenção e o desenvolvimento futuro.
*   **RNF007 - Disponibilidade:**
    *   **RNF007.1:** O sistema DEVE estar disponível 99.5% do tempo (excluindo janelas de manutenção programadas).
