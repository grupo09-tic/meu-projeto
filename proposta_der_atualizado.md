# Proposta de Modelagem de Dados Atualizada (DER) - Projeto Proton

Com base nas novas diretrizes do cliente, a estrutura do banco de dados (PostgreSQL) deve ser ajustada para suportar a hierarquia de documentos, a complexidade dos questionários e o anonimato estrito.

## 1. Módulo de RH e Documentos
Para suportar a hierarquia de três níveis e os contracheques:

### Tabela `documento_categorias`
- `id`: UUID (PK)
- `nome`: VARCHAR(100)
- `tenant_id`: UUID (FK)

### Tabela `documento_subcategorias`
- `id`: UUID (PK)
- `categoria_id`: UUID (FK)
- `nome`: VARCHAR(100)

### Tabela `documentos`
- `id`: UUID (PK)
- `subcategoria_id`: UUID (FK)
- `titulo`: VARCHAR(255)
- `descricao`: TEXT
- `arquivo_url`: TEXT
- `tipo`: ENUM ('GERAL', 'CONTRACHEQUE', 'AVISO')
- `usuario_id`: UUID (FK, opcional - nulo para documentos públicos/mural, preenchido para contracheques)
- `exige_ciente`: BOOLEAN

---

## 2. Módulo de Questionários
Suporte a templates, vídeos e recorrência:

### Tabela `questionario_templates`
- `id`: UUID (PK)
- `titulo`: VARCHAR(255)
- `descricao`: TEXT
- `corpo_json`: JSONB (Estrutura padrão de perguntas)

### Tabela `questionarios`
- `id`: UUID (PK)
- `template_id`: UUID (FK, opcional)
- `titulo`: VARCHAR(255)
- `video_orientacao_url`: TEXT
- `instrucoes_texto`: TEXT
- `is_anonimo`: BOOLEAN (Define se as respostas vinculam ao usuário)
- `permitir_ver_respostas`: BOOLEAN (Se o usuário pode ver o que respondeu)
- `recorrência_origem_id`: UUID (FK para o questionário original, permitindo "reaplicar")
- `data_inicio`: TIMESTAMP
- `data_fim`: TIMESTAMP

### Tabela `respostas`
- `id`: UUID (PK)
- `questionario_id`: UUID (FK)
- `usuario_id`: UUID (FK, NULO se `questionarios.is_anonimo` for TRUE)
- `resposta_json`: JSONB (Contendo opções pré-definidas e texto personalizado)

---

## 3. Módulo de Denúncias
Anonimato total por lei:

### Tabela `denuncias`
- `id`: UUID (PK)
- `protocolo`: VARCHAR(20) (Gerado aleatoriamente para controle interno)
- `relato`: TEXT
- `data_criacao`: TIMESTAMP
- `status`: ENUM ('RECEBIDO', 'EM_ANALISE', 'CONCLUIDO')
- `tenant_id`: UUID (FK)
- **IMPORTANTE:** Sem `usuario_id` ou qualquer rastreio de auditoria que identifique o autor.

---

## 4. Módulo de Permissões (ADM Superior)
### Tabela `permissoes_globais`
- `id`: UUID (PK)
- `nome_rotina`: VARCHAR(100)
- `descricao`: TEXT

### Tabela `perfil_permissoes`
- Centraliza o controle de quem pode o quê, gerenciado pelo Módulo ADM Geral.
