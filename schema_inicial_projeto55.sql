-- Script de Criação de Tabelas - Projeto Anexo Tecnologia
-- Dialeto: PostgreSQL (v13+)

-- Habilita extensão para geração de UUIDs aleatórios
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Núcleo de Multi-tenancy e Usuários
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome_fantasia VARCHAR(255) NOT NULL,
    razao_social VARCHAR(255),
    cnpj VARCHAR(14) UNIQUE,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tipos ENUM para garantir integridade
DO $$ BEGIN
    CREATE TYPE tipo_usuario AS ENUM ('SUPER_ADMIN', 'GESTOR', 'COLABORADOR');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id), -- NULL para SuperAdmin Global
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL,
    cpf VARCHAR(11) UNIQUE,
    departamento VARCHAR(100),
    cargo VARCHAR(100),
    ativo BOOLEAN DEFAULT TRUE,
    tipo tipo_usuario DEFAULT 'COLABORADOR',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Controle de Acesso (RBAC Centralizado)
CREATE TABLE IF NOT EXISTS rotinas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chave VARCHAR(100) UNIQUE NOT NULL, -- Ex: 'RH_DOCS_READ', 'DENUNCIA_MANAGE'
    descricao TEXT
);

CREATE TABLE IF NOT EXISTS perfis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id), -- Permite perfis customizados por empresa
    nome VARCHAR(100) NOT NULL,
    is_template BOOLEAN DEFAULT FALSE, -- Se TRUE, serve de base para novos tenants
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS perfil_permissoes (
    perfil_id UUID REFERENCES perfis(id) ON DELETE CASCADE,
    rotina_id UUID REFERENCES rotinas(id) ON DELETE CASCADE,
    PRIMARY KEY (perfil_id, rotina_id)
);

CREATE TABLE IF NOT EXISTS usuario_perfis (
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    perfil_id UUID REFERENCES perfis(id) ON DELETE CASCADE,
    PRIMARY KEY (usuario_id, perfil_id)
);

-- 3. Módulo de RH e Documentos (Hierarquia de 3 Níveis - RF45)
CREATE TABLE IF NOT EXISTS rh_categorias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id),
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS rh_subcategorias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    categoria_id UUID REFERENCES rh_categorias(id) ON DELETE CASCADE,
    nome VARCHAR(100) NOT NULL
);

DO $$ BEGIN
    CREATE TYPE tipo_documento AS ENUM ('GERAL', 'CONTRACHEQUE', 'AVISO');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS rh_documentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subcategoria_id UUID REFERENCES rh_subcategorias(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    arquivo_url TEXT NOT NULL,
    tipo tipo_documento DEFAULT 'GERAL',
    usuario_id UUID REFERENCES usuarios(id), -- Privado se preenchido (ex: Contracheque)
    exige_ciencia BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rh_documentos_ciencia (
    documento_id UUID REFERENCES rh_documentos(id) ON DELETE CASCADE,
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    data_ciencia TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (documento_id, usuario_id)
);

-- 4. Módulo de Questionários (Templates, Vídeos e Hibridismo)
CREATE TABLE IF NOT EXISTS ques_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo VARCHAR(255) NOT NULL,
    estrutura_json JSONB -- Define o modelo de perguntas
);

CREATE TABLE IF NOT EXISTS ques_questionarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id),
    template_id UUID REFERENCES ques_templates(id) ON DELETE SET NULL,
    titulo VARCHAR(255) NOT NULL,
    video_url TEXT, -- RF18: Vídeo obrigatório
    instrucoes TEXT,
    is_anonimo BOOLEAN DEFAULT FALSE,
    recorrencia_pai_id UUID REFERENCES ques_questionarios(id), -- Para "reaplicar" (RF20)
    data_inicio TIMESTAMP WITH TIME ZONE,
    data_fim TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ques_respostas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    questionario_id UUID REFERENCES ques_questionarios(id) ON DELETE CASCADE,
    usuario_id UUID REFERENCES usuarios(id), -- NULO se is_anonimo for TRUE (RF16)
    dados_json JSONB, -- Respostas híbridas (opções + texto) (RF19)
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Módulo de Denúncias (Anonimato Estrito por Lei - RF22)
DO $$ BEGIN
    CREATE TYPE status_denuncia AS ENUM ('RECEBIDO', 'EM_ANALISE', 'CONCLUIDO');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS denuncias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id),
    protocolo VARCHAR(20) UNIQUE NOT NULL, -- Para consulta sem identificar usuário
    relato TEXT NOT NULL,
    status status_denuncia DEFAULT 'RECEBIDO',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    -- OBS: SEM usuario_id para garantir Anonimato Real (RNF02)
);

CREATE TABLE IF NOT EXISTS denuncia_anexos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    denuncia_id UUID REFERENCES denuncias(id) ON DELETE CASCADE,
    arquivo_url TEXT NOT NULL,
    tipo_arquivo VARCHAR(50)
);

-- 6. Auditoria e Logs (Rastreabilidade - RNF04)
CREATE TABLE IF NOT EXISTS logs_auditoria (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id),
    usuario_id UUID REFERENCES usuarios(id),
    acao VARCHAR(255) NOT NULL,
    contexto JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
