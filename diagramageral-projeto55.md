# Documentação Técnica: Diagrama de Casos de Uso (Geral) - Projeto Proton

**Versão:** 1.0 (Revisão Técnica Final - Sintaxe Mermaid)  
**Status:** Aprovado

---

## 1. Diagrama de Caso de Uso (Mermaid)

```mermaid
graph LR
    %% Definição de Atores (Estilo Stickman aproximado em Mermaid)
    C["👤 Colaborador"]
    RH["💼 Gestor RH / Líder"]
    SA["🌐 SuperAdmin (Anexo Tech)"]

    subgraph "Plataforma Proton (Web & Mobile)"
        %% Casos de Uso
        UC00([UC00: Efetuar Login])
        UC01([UC01: Visualizar Mural e Avisos])
        UC02([UC02: Confirmar Leitura - Dar Ciente])
        UC03([UC03: Visualizar Contracheques e Documentos])
        
        UC04([UC04: Responder Questionário])
        UC21([UC21: Assistir Vídeo de Orientação])
        
        UC06([UC06: Registrar Denúncia Anônima])
        
        UC09([UC09: Publicar no Mural])
        UC10([UC10: Gerenciar Questionários e Templates])
        UC11([UC11: Gerenciar Permissões e RBAC])
        UC12([UC12: Visualizar Dashboards])
        UC13([UC13: Investigar/Seguimento de Denúncias])
        UC23([UC23: Gerenciar Hierarquia de Documentos])
        
        UC15([UC15: Gerenciar Empresas - Tenants])
        UC16([UC16: Configurar Rotinas Globais])
        UC18([UC18: Consultar Logs de Auditoria])
        
        UC20([UC20: Anexar Arquivos])
    end

    %% Associações: Colaborador
    C --- UC00
    C --- UC01
    C --- UC03
    C --- UC04
    C --- UC06

    %% Associações: Gestor RH
    RH --- UC00
    RH --- UC09
    RH --- UC10
    RH --- UC11
    RH --- UC12
    RH --- UC13
    RH --- UC23
    RH --- UC18

    %% Associações: SuperAdmin
    SA --- UC11
    SA --- UC15
    SA --- UC16

    %% Relacionamentos
    UC02 -. "<<include>>" .-> UC01
    UC21 -. "<<include>>" .-> UC04
    UC20 -. "<<extend>>" .-> UC06
    UC20 -. "<<extend>>" .-> UC09

    %% Relacionamentos de Dependência (Regras de Negócio)
    UC02 -. "<<include>>" .-> UC01
    UC19 -. "<<extend>>" .-> UC00
    UC07 -. "<<extend>>" .-> UC06
    UC20 -. "<<extend>>" .-> UC06
    UC20 -. "<<extend>>" .-> UC09
    UC04 -. "<<include>>" .-> UC00
```

---

## 2. Descrição Detalhada dos Casos de Uso Críticos

| ID | Caso de Uso | Ator Principal | Descrição |
| :--- | :--- | :--- | :--- |
| **UC02** | Dar Ciente | Colaborador | O sistema registra o ID do usuário e o timestamp no momento em que ele confirma a leitura de um documento obrigatório. |
| **UC07** | Ativar Anonimato | Colaborador | Ao marcar esta opção, o sistema rompe o vínculo entre o `usuario_id` e a denúncia, gerando apenas um token de acompanhamento. |
| **UC11** | Gerenciar RBAC | RH | O Admin da empresa define quais perfis podem acessar rotinas sensíveis (ex: ver denúncias de líderes). |
| **UC18** | Consultar Logs | RH / SuperAdmin | Rastreabilidade de quem alterou perfis, excluiu usuários ou acessou dados sensíveis, conforme RNF04. |

---

## 3. Notas de Implementação
1.  **Sincronização:** O UC08 deve funcionar via chave de acesso (protocolo) para garantir que denunciantes anônimos não precisem de login para acompanhar o status.
2.  **Segurança:** O UC19 (2FA) é uma extensão do login e deve ser disparado automaticamente para perfis com permissões administrativas.
