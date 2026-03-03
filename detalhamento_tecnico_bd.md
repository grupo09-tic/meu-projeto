# Detalhamento Técnico do Banco de Dados - Projeto Proton (projeto55)

Este documento descreve a estrutura física do banco de dados PostgreSQL, projetada para atender aos requisitos de multi-tenancy, RBAC centralizado, hierarquia de documentos e anonimato estrito.

## 1. Núcleo de Multi-tenancy e Usuários

### Tabela: `tenants` (Empresas)
Armazena as organizações que utilizam a plataforma.
- `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `nome_fantasia`: VARCHAR(255) NOT NULL
- `razao_social`: VARCHAR(255)
- `cnpj`: VARCHAR(14) UNIQUE
- `ativo`: BOOLEAN DEFAULT TRUE
- `created_at`: TIMESTAMP DEFAULT NOW()

### Tabela: `usuarios`
- `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `tenant_id`: UUID REFERENCES tenants(id) -- Nulo para SuperAdmin Global
- `nome`: VARCHAR(255) NOT NULL
- `email`: VARCHAR(255) UNIQUE NOT NULL
- `senha_hash`: TEXT NOT NULL
- `cpf`: VARCHAR(11) UNIQUE
- `departamento`: VARCHAR(100)
- `cargo`: VARCHAR(100)
- `data_admissao`: DATE
- `ativo`: BOOLEAN DEFAULT TRUE
- `tipo`: ENUM('SUPER_ADMIN', 'GESTOR', 'COLABORADOR') DEFAULT 'COLABORADOR'

---

## 2. Controle de Acesso (RBAC Centralizado)

Conforme o RF49, as permissões são centralizadas e geridas pelo Módulo ADM Geral.

### Tabela: `rotinas` (Funcionalidades do Sistema)
- `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `chave`: VARCHAR(100) UNIQUE NOT NULL -- Ex: 'RH_DOCS_READ', 'DENUNCIA_MANAGE'
- `descricao`: TEXT

### Tabela: `perfis`
- `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `tenant_id`: UUID REFERENCES tenants(id)
- `nome`: VARCHAR(100) NOT NULL -- Ex: 'RH Local', 'Líder de Equipe'
- `is_template`: BOOLEAN DEFAULT FALSE -- Se TRUE, serve de base para novos tenants

### Tabela: `perfil_permissoes`
- `perfil_id`: UUID REFERENCES perfis(id)
- `rotina_id`: UUID REFERENCES rotinas(id)
- PRIMARY KEY (perfil_id, rotina_id)

### Tabela: `usuario_perfis`
- `usuario_id`: UUID REFERENCES usuarios(id)
- `perfil_id`: UUID REFERENCES perfis(id)
- PRIMARY KEY (usuario_id, perfil_id)

---

## 3. Módulo de RH e Documentos (Hierarquia de 3 Níveis)

### Tabela: `rh_categorias`
- `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `tenant_id`: UUID REFERENCES tenants(id)
- `nome`: VARCHAR(100) NOT NULL

### Tabela: `rh_subcategorias`
- `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `categoria_id`: UUID REFERENCES rh_categorias(id) ON DELETE CASCADE
- `nome`: VARCHAR(100) NOT NULL

### Tabela: `rh_documentos`
- `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `subcategoria_id`: UUID REFERENCES rh_subcategorias(id)
- `titulo`: VARCHAR(255) NOT NULL
- `descricao`: TEXT
- `arquivo_url`: TEXT NOT NULL
- `tipo`: ENUM('GERAL', 'CONTRACHEQUE', 'AVISO') DEFAULT 'GERAL'
- `usuario_id`: UUID REFERENCES usuarios(id) -- Preenchido apenas para Contracheques/Privados
- `exige_ciencia`: BOOLEAN DEFAULT FALSE
- `created_at`: TIMESTAMP DEFAULT NOW()

### Tabela: `rh_documentos_ciencia`
- `documento_id`: UUID REFERENCES rh_documentos(id)
- `usuario_id`: UUID REFERENCES usuarios(id)
- `data_ciencia`: TIMESTAMP DEFAULT NOW()
- PRIMARY KEY (documento_id, usuario_id)

---

## 4. Módulo de Questionários e Respostas

### Tabela: `ques_templates`
- `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `titulo`: VARCHAR(255) NOT NULL
- `descricao`: TEXT
- `estrutura_json`: JSONB -- Modelo de perguntas padrão

### Tabela: `ques_questionarios`
- `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `tenant_id`: UUID REFERENCES tenants(id)
- `template_id`: UUID REFERENCES ques_templates(id)
- `titulo`: VARCHAR(255) NOT NULL
- `video_url`: TEXT -- RF18: Vídeo obrigatório
- `instrucoes`: TEXT
- `is_anonimo`: BOOLEAN DEFAULT FALSE
- `recorrência_pai_id`: UUID REFERENCES ques_questionarios(id) -- Para "reaplicar"
- `data_inicio`: TIMESTAMP
- `data_fim`: TIMESTAMP

### Tabela: `ques_respostas`
- `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `questionario_id`: UUID REFERENCES ques_questionarios(id)
- `usuario_id`: UUID REFERENCES usuarios(id) -- NULO se ques_questionarios.is_anonimo = TRUE
- `dados_json`: JSONB -- Respostas híbridas (opções + texto)
- `submitted_at`: TIMESTAMP DEFAULT NOW()

---

## 5. Módulo de Denúncias (Anonimato Estrito)

### Tabela: `denuncias`
- `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `tenant_id`: UUID REFERENCES tenants(id)
- `protocolo`: VARCHAR(20) UNIQUE NOT NULL
- `relato`: TEXT NOT NULL
- `status`: ENUM('RECEBIDO', 'EM_ANALISE', 'CONCLUIDO') DEFAULT 'RECEBIDO'
- `created_at`: TIMESTAMP DEFAULT NOW()
-- OBS: Sem usuario_id para garantir anonimato real (RNF02).

### Tabela: `denuncia_anexos`
- `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `denuncia_id`: UUID REFERENCES denuncias(id) ON DELETE CASCADE
- `arquivo_url`: TEXT NOT NULL
- `tipo_arquivo`: VARCHAR(50)

---

## 6. Dashboard e Auditoria (Logs)

### Tabela: `logs_auditoria`
- `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `tenant_id`: UUID REFERENCES tenants(id)
- `usuario_id`: UUID REFERENCES usuarios(id)
- `acao`: VARCHAR(255)
- `contexto`: JSONB -- Detalhes da alteração
- `created_at`: TIMESTAMP DEFAULT NOW()
