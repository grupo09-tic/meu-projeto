# Definição de Perfis e Permissões (RBAC)

Este documento detalha a arquitetura de acesso do **projeto55**, conforme as diretrizes do cliente (Anderson).

## Conceito: Sem Níveis, Apenas Perfis e Rotinas

Diferente de um modelo hierárquico fixo (onde um nível "2" é superior ao "1"), o sistema utiliza o conceito de **RBAC (Role-Based Access Control)**.

1.  **Rotinas:** São as funcionalidades individuais do sistema (ex: "Criar Comunicado", "Ver Relatórios", "Responder Avaliação").
2.  **Perfis:** São conjuntos de permissões ("molho de chaves"). Um perfil agrupa quais rotinas um usuário pode acessar.
3.  **Usuários:** São vinculados a um Perfil. O sistema não checa o "cargo" do usuário, mas sim se o seu **Perfil** possui permissão para a **Rotina** que ele tenta acessar.

## Estrutura Multi-tenant

O sistema deve suportar múltiplas empresas de forma isolada:

*   **SuperAdmin (Anexo Tech):** Gerencia as Empresas Clientes e as Rotinas Globais.
*   **Admin da Empresa (Cliente):** Gerencia os Perfis e Usuários de sua própria empresa.
*   **Usuário Final:** Interage com o sistema conforme as permissões de seu perfil.

## Exemplo de Configuração de Perfil

| Rotina | Perfil: Colaborador | Perfil: Líder de Time | Perfil: Admin RH |
| :--- | :---: | :---: | :---: |
| Ver Comunicados | Sim | Sim | Sim |
| Confirmar Ciente | Sim | Sim | Sim |
| Enviar Feedback | Sim | Sim | Sim |
| Criar Comunicado | Não | Sim | Sim |
| Ver Feedbacks de Outros | Não | Não | Sim |
| Cadastrar Usuários | Não | Não | Sim |

**Vantagem:** Permite que cada empresa cliente defina sua própria hierarquia sem necessidade de alteração no código do software.
