# MVP Atualizado: Plataforma Proton (projeto55)

Este documento define o Produto Mínimo Viável (MVP) da plataforma AnexoTech, integrando a visão de negócios com os requisitos técnicos fundamentais para garantir escalabilidade, segurança e engajamento.

## 1. Visão do Produto
O nosso sistema é uma plataforma SaaS (Software as a Service) multi-tenant focada em fechar o gap de comunicação entre a base operacional e a gestão estratégica. O foco é transformar o silêncio e o feedback informal em dados mensuráveis e canais seguros de escuta.

---

## 2. Atores do Sistema
Para este MVP, o sistema será operado por três papéis principais (Podendo ser reduzido a dois casos de uso, conforme as permissões atribuídas ao usuário nas rotinas do sistema.):
*   **Colaborador:** Usuário final que consome comunicados, responde pesquisas e utiliza o canal de ética.
*   **Gestor Administrativo (RH/Líder):** Administrador da empresa cliente que gerencia a comunicação interna, monitora o clima e responde a demandas.
*   **SuperAdmin (Anexo Tech):** Administrador global que gerencia as empresas contratantes (Tenants) e as rotinas do sistema.
    // GESTRO ADMINISTRATIVO E SUPERADMIN PODEM SER UM SÓ PERFIL DEPENDENDO DA NECESSIDADE/EMPRESA.

---

## 3. Escopo Funcional (O que o MVP entrega)

### 3.1. Módulo de Comunicação e Transparência (Mural & RH)
*   **Mural Corporativo:** Publicação de comunicados e avisos com segmentação por setor.
*   **Confirmação de Leitura ("Ciente"):** Registro formal de leitura para documentos obrigatórios e avisos.
*   **Gestão de Documentos de RH:** Organização hierárquica (Categoria > Subcategoria > Documento) e visualização de **Contracheques** individuais via App e Web.

### 3.2. Módulo de Escuta Ativa (Pesquisas & PDI)
*   **Questionários Flexíveis:** Uso de modelos (templates) ou criação livre, com obrigatoriedade de orientação em **vídeo ou texto explicativo**.
*   **Recorrência:** Função para "reaplicar" questionários (ex: Clima) mantendo comparativos.
*   **Visibilidade Controlada:** Configuração para permitir ou bloquear o acesso do colaborador às suas respostas (ex: PDI vs Clima).

### 3.3. Módulo de Ética (Canal de Denúncias)
*   **Anonimato Obrigatório:** Canal focado exclusivamente em denúncias anônimas (requisito legal).
*   **Gestão Interna:** Status e seguimento da investigação visíveis apenas para os perfis de Gestão/RH.
*   **Gestão de Anexos:** Upload de evidências (fotos, áudios, documentos).

### 3.4. Módulo de Inteligência e Gestão (Dashboard & ADM Superior)
*   **Controle Centralizado (ADM Geral):** Módulo superior para controle total de permissões e acessos do sistema.
*   **Dashboards Estratégicos:** Visualização de indicadores de clima, adesão aos avisos e volume de denúncias.
*   **Isolamento Multi-tenant:** Garantia de segurança e segregação de dados entre empresas.

---

## 4. Definição Técnica do MVP
*   **Portal Web (Desktop):** Destinado aos administradores (RH/Líderes) e SuperAdmin para gestão, configuração e análise de dados.
*   **Aplicativo Mobile (Android/iOS):** Destinado aos colaboradores para consumo de comunicados, registro de "Ciente", resposta de pesquisas e envio de denúncias/sugestões.
*   **Segurança:** Criptografia de dados sensíveis, conformidade com LGPD e anonimato garantido por hash/protocolo.
*   **Autenticação:** Login e senha via Web e App, com suporte a Notificações Push no celular.

---

## 5. O Que Fica Para Versões Futuras
*   Análise de Sentimento com Inteligência Artificial.
*   Integração direta com ERPs e Folha de Pagamento.
*   Módulo de Gamificação para engajamento.
*   Dashboard individual de jornada do colaborador.

---

## 6. Justificativa do Recorte
Este MVP valida a **"Dor da Escuta Ativa"**. A inclusão do **Aplicativo Mobile** é vital porque a maioria dos colaboradores operacionais não possui computador corporativo. Ao oferecer um canal na palma da mão com valor jurídico (Ciente) e segurança (Canal de Ética), o Proton resolve o problema de isolamento da operação de forma definitiva.
