-- Projeto AnexoTech 
-- Dialeto: PostgreSQL (v13+)

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. NÚCLEO E MULTI-TENANCY
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome_fantasia VARCHAR(255) NOT NULL,
    cnpj VARCHAR(14) UNIQUE,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS departamentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    nome VARCHAR(100) NOT NULL,
    UNIQUE(tenant_id, nome)
);

CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    departamento_id UUID REFERENCES departamentos(id) ON DELETE SET NULL,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. RBAC (CONTROLE DE ACESSO BASEADO EM PERFIL)
CREATE TABLE IF NOT EXISTS rotinas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chave VARCHAR(100) UNIQUE NOT NULL,
    descricao TEXT
);

CREATE TABLE IF NOT EXISTS perfis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    nome VARCHAR(100) NOT NULL,
    is_template BOOLEAN DEFAULT FALSE,
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

-- 3. MURAL DE AVISOS (COMUNICAÇÃO)
CREATE TABLE IF NOT EXISTS mural_avisos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    exige_ciencia BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mural_avisos_departamentos (
    aviso_id UUID REFERENCES mural_avisos(id) ON DELETE CASCADE,
    departamento_id UUID REFERENCES departamentos(id) ON DELETE CASCADE,
    PRIMARY KEY (aviso_id, departamento_id)
);

CREATE TABLE IF NOT EXISTS mural_avisos_ciencia (
    aviso_id UUID REFERENCES mural_avisos(id) ON DELETE CASCADE,
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    data_ciencia TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (aviso_id, usuario_id)
);

-- 4. DOCUMENTOS DE RH (HIERARQUIA DE 3 NÍVEIS)
CREATE TABLE IF NOT EXISTS rh_categorias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS rh_subcategorias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, -- Segurança Redundante (Multi-tenancy)
    categoria_id UUID REFERENCES rh_categorias(id) ON DELETE CASCADE,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS rh_documentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, -- Segurança Redundante (Multi-tenancy)
    subcategoria_id UUID REFERENCES rh_subcategorias(id) ON DELETE CASCADE,
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    arquivo_url TEXT NOT NULL,
    exige_ciencia BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. QUESTIONÁRIOS E PESQUISAS
CREATE TABLE IF NOT EXISTS ques_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    estrutura_json JSONB
);

CREATE TABLE IF NOT EXISTS ques_questionarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    template_id UUID REFERENCES ques_templates(id) ON DELETE SET NULL,
    recorrencia_pai_id UUID REFERENCES ques_questionarios(id),
    titulo VARCHAR(255) NOT NULL,
    video_url TEXT,
    is_anonimo BOOLEAN DEFAULT FALSE,
    permite_visualizar_resposta BOOLEAN DEFAULT FALSE, -- Regra para PDI vs Clima
    data_inicio TIMESTAMP WITH TIME ZONE, -- Agendamento
    data_fim TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ques_questionarios_departamentos (
    questionario_id UUID REFERENCES ques_questionarios(id) ON DELETE CASCADE,
    departamento_id UUID REFERENCES departamentos(id) ON DELETE CASCADE,
    PRIMARY KEY (questionario_id, departamento_id)
);

CREATE TABLE IF NOT EXISTS ques_respostas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    questionario_id UUID REFERENCES ques_questionarios(id) ON DELETE CASCADE,
    usuario_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    dados_json JSONB,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. DENÚNCIAS (ANONIMATO ESTRITO)
CREATE TABLE IF NOT EXISTS denuncias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    protocolo VARCHAR(20) UNIQUE NOT NULL,
    relato TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'RECEBIDO' CHECK (status IN ('RECEBIDO', 'EM_ANALISE', 'CONCLUIDO')), -- Integridade de Dados
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS denuncia_anexos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    denuncia_id UUID REFERENCES denuncias(id) ON DELETE CASCADE,
    arquivo_url TEXT NOT NULL
);

-- 7. AUDITORIA E ÍNDICES
CREATE TABLE IF NOT EXISTS logs_auditoria (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    usuario_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    acao VARCHAR(255) NOT NULL,
    contexto JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ÍNDICES ESTRATÉGICOS
CREATE INDEX IF NOT EXISTS idx_usuarios_tenant ON usuarios(tenant_id);
CREATE INDEX IF NOT EXISTS idx_documentos_tenant ON rh_documentos(tenant_id); -- Novo índice para segurança RLS
CREATE INDEX IF NOT EXISTS idx_logs_tenant ON logs_auditoria(tenant_id);
CREATE INDEX IF NOT EXISTS idx_perfis_template ON perfis(is_template) WHERE is_template IS TRUE;
