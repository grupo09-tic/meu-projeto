# Dicionário de Dados - Projeto Proton (projeto55)

Este documento detalha a estrutura técnica de todas as 20 tabelas do banco de dados PostgreSQL (v13+), incluindo tipos de dados, restrições e finalidades.

---

## 🏗️ 1. Módulo Core e Multi-tenancy
Gerenciamento de empresas clientes e isolamento de dados.

### Tabela: `tenants`
Empresas clientes da plataforma.
| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK, Default: random | Identificador único da empresa. |
| `nome_fantasia` | VARCHAR(255) | NOT NULL | Nome de exibição da empresa. |
| `cnpj` | VARCHAR(14) | UNIQUE | Registro nacional da empresa. |
| `ativo` | BOOLEAN | DEFAULT TRUE | Status de acesso da empresa. |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Data de cadastro. |

### Tabela: `departamentos`
Setores internos de cada empresa.
| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK, Default: random | Identificador único. |
| `tenant_id` | UUID | FK (tenants.id) | Vinculação à empresa dona. |
| `nome` | VARCHAR(100) | NOT NULL | Nome do setor (RH, Vendas, etc). |

---

## 🔐 2. Módulo de Acesso (RBAC)
Controle de usuários e permissões baseadas em perfis.

### Tabela: `usuarios`
Cadastro centralizado de colaboradores e gestores.
| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK, Default: random | Identificador único. |
| `tenant_id` | UUID | FK (tenants.id) | Empresa do colaborador. |
| `departamento_id`| UUID | FK (departamentos.id)| Setor atual do colaborador. |
| `nome` | VARCHAR(255) | NOT NULL | Nome completo. |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | E-mail corporativo (Login). |
| `senha_hash` | TEXT | NOT NULL | Senha criptografada. |
| `ativo` | BOOLEAN | DEFAULT TRUE | Se o usuário pode logar. |

### Tabela: `rotinas`
Funcionalidades mapeadas no sistema.
| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK, Default: random | Identificador único. |
| `chave` | VARCHAR(100) | UNIQUE, NOT NULL | Nome técnico (Ex: `VER_DENUNCIA`). |
| `descricao` | TEXT | - | O que a rotina libera no sistema. |

### Tabela: `perfis`
Papéis ou Cargos com permissões agrupadas.
| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK, Default: random | Identificador único. |
| `tenant_id` | UUID | FK (tenants.id) | Empresa dona do perfil. |
| `nome` | VARCHAR(100) | NOT NULL | Nome (Ex: Gestor, Operacional). |
| `is_template` | BOOLEAN | DEFAULT FALSE | Se é um perfil padrão do sistema. |

### Tabelas de Associação (N:N)
*   **`perfil_permissoes`**: Liga `perfis` às `rotinas`.
*   **`usuario_perfis`**: Atribui um ou mais `perfis` a um `usuarios`.

---

## 📢 3. Módulo de Comunicação (Mural)
Gestão de avisos e confirmação de leitura.

### Tabela: `mural_avisos`
Comunicados oficiais.
| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK | Identificador único. |
| `titulo` | VARCHAR(255) | NOT NULL | Título do comunicado. |
| `conteudo` | TEXT | NOT NULL | Corpo do texto (Suporta HTML/Markdown). |
| `exige_ciencia` | BOOLEAN | DEFAULT TRUE | Se obriga o botão "Confirmar Ciente". |

### Tabela: `mural_avisos_departamentos` (N:N)
Define o **Público-Alvo** por setor.

### Tabela: `mural_avisos_ciencia`
Registro de quem já leu o aviso.
| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `aviso_id` | UUID | FK (mural_avisos.id) | O aviso lido. |
| `usuario_id` | UUID | FK (usuarios.id) | O usuário que leu. |
| `data_ciencia` | TIMESTAMP | DEFAULT NOW() | Data e hora exata da leitura. |

---

## 📂 4. Módulo de RH (Hierarquia de Documentos)
Organização em 3 níveis: Categoria > Subcategoria > Documento.

### Tabela: `rh_categorias` (Nível 1)
Exemplo: "Políticas Internas", "Benefícios".

### Tabela: `rh_subcategorias` (Nível 2)
Exemplo: "Código de Conduta", "Manual de Férias".

### Tabela: `rh_documentos` (Nível 3)
O arquivo final (PDF).
| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK | Identificador único. |
| `titulo` | VARCHAR(255) | NOT NULL | Nome do documento. |
| `arquivo_url` | TEXT | NOT NULL | Link para o arquivo no Storage (S3/GCP). |
| `usuario_id` | UUID | FK (usuarios.id) | Nulo se geral, preenchido se for individual (ex: contracheque). |

---

## 📝 5. Módulo de Questionários (Pesquisas)
Suporte a pesquisas de clima, PDI e formulários com vídeo.

### Tabela: `ques_templates`
Estruturas de perguntas reutilizáveis.
| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK | Identificador único. |
| `estrutura_json` | JSONB | NOT NULL | Objeto com tipos de perguntas e opções. |

### Tabela: `ques_questionarios`
A instância da pesquisa enviada aos colaboradores.
| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `video_url` | TEXT | - | Link do vídeo de instrução obrigatório. |
| `is_anonimo` | BOOLEAN | DEFAULT FALSE | Se o sistema deve ocultar o autor. |
| `recorrencia_pai_id`| UUID | FK (self.id) | Referência se for cópia de pesquisa anterior. |

### Tabela: `ques_respostas`
Dados coletados.
| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `usuario_id` | UUID | FK (Opcional) | Nulo se `is_anonimo = true`. |
| `dados_json` | JSONB | NOT NULL | Respostas dadas às perguntas. |

---

## 🕵️ 6. Módulo Ético (Denúncias)
Sigilo absoluto e acompanhamento via protocolo.

### Tabela: `denuncias`
Relatos anônimos.
| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `protocolo` | VARCHAR(20) | UNIQUE, NOT NULL | Código aleatório para consulta. |
| `status` | VARCHAR(50) | CHECK (Enums) | RECEBIDO, EM_ANALISE ou CONCLUIDO. |
| `relato` | TEXT | NOT NULL | Descrição do ocorrido. |

### Tabela: `denuncia_anexos`
Provas enviadas pelo denunciante (Fotos, Áudios).

---

## 🛡️ 7. Módulo de Governança
### Tabela: `logs_auditoria`
Rastreabilidade para Auditoria e Compliance (LGPD).
| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `usuario_id` | UUID | FK | Quem realizou a ação. |
| `acao` | VARCHAR(255) | NOT NULL | Descrição da ação (Ex: "Deletou Usuário"). |
| `contexto` | JSONB | - | Valores anteriores e novos para auditoria. |
