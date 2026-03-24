-- Inserindo Rotinas (CIDADES)
INSERT INTO "tbCidade" ("pkCidade", "nomeCidade", "uf", "version", "createdAt", "updatedAt")
VALUES 
(4309209, 'Gravataí', 'RS', 1, NOW(), NOW()),
(4303103, 'Cachoeirinha', 'RS', 1, NOW(), NOW());

-- Inserindo Ações
INSERT INTO "tbAcao" ("pkAcao", "nomeAcao", "version", "createdAt", "updatedAt")
VALUES
(1, 'Listar', 1, NOW(), NOW()),
(2, 'Visualizar', 1, NOW(), NOW()),
(3, 'Criar', 1, NOW(), NOW()),
(4, 'Clonar', 1, NOW(), NOW()),
(5, 'Editar', 1, NOW(), NOW()),
(6, 'Excluir', 1, NOW(), NOW()),
(7, 'Exportar', 1, NOW(), NOW()),
(8, 'Alterar Senha', 1, NOW(), NOW()),
(9, 'Bloquear', 1, NOW(), NOW()),
(10, 'Desbloquear', 1, NOW(), NOW()),
(11, 'Cancelar', 1, NOW(), NOW()),
(12, 'Reativar', 1, NOW(), NOW());

-- Inserindo Rotinas (CORRIGIDO: troquei o ; por , no item 107)
INSERT INTO "tbRotina" ("pkRotina", "nomeRotina", "version", "createdAt", "updatedAt")
VALUES 
(101, 'Perfil de Usuário', 1, NOW(), NOW()),
(102, 'Usuário', 1, NOW(), NOW()),
(103, 'Log', 1, NOW(), NOW()),
(104, 'Log de Sessão', 1, NOW(), NOW()),
(105, 'Relatório', 1, NOW(), NOW()),
(106, 'Config. Email', 1, NOW(), NOW()),
(107, 'Config. Storage', 1, NOW(), NOW()), 

(201, 'Cidade', 1, NOW(), NOW()),
(202, 'Cliente', 1, NOW(), NOW()),
(203, 'Contrato', 1, NOW(), NOW()),
(204, 'Licença', 1, NOW(), NOW()),
(205, 'Projeto', 1, NOW(), NOW()),
(206, 'Módulo', 1, NOW(), NOW()),
(207, 'Reclamação', 1, NOW(), NOW()),
(208, 'Recurso', 1, NOW(), NOW()),
(209, 'Notificação', 1, NOW(), NOW()),
(210, 'Certificado', 1, NOW(), NOW()),
(211, 'Módulo Interface', 1, NOW(), NOW()),
(212, 'Api Keys', 1, NOW(), NOW());

-- Insert Perfil Usuario
INSERT INTO "tbPerflUsuario" ("pkPerfilUsuario", "nomePerfilUsuario", "version", "createdAt", "updatedAt") 
VALUES (1, 'Perfil Administrador',  1, NOW(), NOW())
ON CONFLICT ("pkPerfilUsuario") DO NOTHING;

INSERT INTO "tbCliente" ("pkCliente", "razaoSocial", "nomeFantasia", "cnpjCpf", "fone", "email", "endereco", 
  "num", "bairro", "cep", "fkCidade", "ativo", "version", "createdAt", "updatedAt")
VALUES (1, 'Cliente Matriz', 'Anexo Cliente', '00000000000000', '00000000000', 'contato@anexo.com.br', 'Rua Principal',
  'SN', 'Centro', '00000000', 4309209, true, 1, NOW(), NOW()) 
ON CONFLICT ("pkCliente") DO NOTHING;

INSERT INTO "tbUsuario" ("pkUsuario", "nomeUsuario", "email",
  "senha", "ativo", "fkPerfilUsuario", "version", "createdAt", "updatedAt") 
VALUES (1, 'Administrador', 'admin@example.com',
  '$2b$10$t4aotmkXl5LYk4OYkwao2.Q4XGCCUBJNP0bkcCWLxx.0kdk2LBF6y',  true, 1, 1, NOW(), NOW() )
ON CONFLICT ("pkUsuario") DO UPDATE SET "email" = EXCLUDED."email", "senha" = EXCLUDED."senha";

-- Inserindo Permissões
INSERT INTO "tbPermissao" ("permissao", "fkPerfilUsuario", "fkRotina", "fkAcao", "version", "createdAt", "updatedAt")
VALUES 
-- Perfil de Usuário (101)
(1, 1, 101, 1, 1, NOW(), NOW()),
(1, 1, 101, 2, 1, NOW(), NOW()),
(1, 1, 101, 3, 1, NOW(), NOW()),
(1, 1, 101, 4, 1, NOW(), NOW()),
(1, 1, 101, 5, 1, NOW(), NOW()),
(0, 1, 101, 6, 1, NOW(), NOW()),
(1, 1, 101, 7, 1, NOW(), NOW()),

-- Usuário (102)
(1, 1, 102, 1, 1, NOW(), NOW()),
(1, 1, 102, 2, 1, NOW(), NOW()),
(1, 1, 102, 3, 1, NOW(), NOW()),
(1, 1, 102, 4, 1, NOW(), NOW()),
(1, 1, 102, 5, 1, NOW(), NOW()),
(0, 1, 102, 6, 1, NOW(), NOW()),
(1, 1, 102, 7, 1, NOW(), NOW()),

-- Log (103)
(1, 1, 103, 1, 1, NOW(), NOW()),

-- Log de Sessão (104)
(1, 1, 104, 1, 1, NOW(), NOW()),

-- Relatório (105)
(1, 1, 105, 1, 1, NOW(), NOW()),
(1, 1, 105, 2, 1, NOW(), NOW()),
(1, 1, 105, 3, 1, NOW(), NOW()),
(1, 1, 105, 4, 1, NOW(), NOW()),
(1, 1, 105, 5, 1, NOW(), NOW()),
(0, 1, 105, 6, 1, NOW(), NOW()),
(1, 1, 105, 7, 1, NOW(), NOW()),

-- Config. Email (106)
(1, 1, 106, 1, 1, NOW(), NOW()),
(1, 1, 106, 5, 1, NOW(), NOW()),

-- Config. Storage (107)
(1, 1, 107, 1, 1, NOW(), NOW()),
(1, 1, 107, 5, 1, NOW(), NOW()),

-- Cidade (201)
(1, 1, 201, 1, 1, NOW(), NOW()),
(1, 1, 201, 2, 1, NOW(), NOW()),
(1, 1, 201, 3, 1, NOW(), NOW()),
(1, 1, 201, 5, 1, NOW(), NOW()),
(0, 1, 201, 6, 1, NOW(), NOW()),
(1, 1, 201, 7, 1, NOW(), NOW()),

-- Cliente (202)
(1, 1, 202, 1, 1, NOW(), NOW()),
(1, 1, 202, 2, 1, NOW(), NOW()),
(1, 1, 202, 3, 1, NOW(), NOW()),
(1, 1, 202, 5, 1, NOW(), NOW()),
(0, 1, 202, 6, 1, NOW(), NOW()),
(1, 1, 202, 7, 1, NOW(), NOW()),

-- Contrato (203)
(1, 1, 203, 1, 1, NOW(), NOW()),
(1, 1, 203, 2, 1, NOW(), NOW()),
(1, 1, 203, 3, 1, NOW(), NOW()),
(1, 1, 203, 5, 1, NOW(), NOW()),
(0, 1, 203, 6, 1, NOW(), NOW()),
(1, 1, 203, 7, 1, NOW(), NOW()),
(1, 1, 203, 9, 1, NOW(), NOW()),  
(1, 1, 203, 10, 1, NOW(), NOW()), 
(1, 1, 203, 11, 1, NOW(), NOW()), 
(1, 1, 203, 12, 1, NOW(), NOW()),  

-- Licença (204)
(1, 1, 204, 1, 1, NOW(), NOW()),
(1, 1, 204, 2, 1, NOW(), NOW()),
(1, 1, 204, 3, 1, NOW(), NOW()),
(1, 1, 204, 5, 1, NOW(), NOW()),
(0, 1, 204, 6, 1, NOW(), NOW()),
(1, 1, 204, 7, 1, NOW(), NOW()),

-- Projeto (205)
(1, 1, 205, 1, 1, NOW(), NOW()),
(1, 1, 205, 2, 1, NOW(), NOW()),
(1, 1, 205, 3, 1, NOW(), NOW()),
(1, 1, 205, 5, 1, NOW(), NOW()),
(0, 1, 205, 6, 1, NOW(), NOW()),
(1, 1, 205, 7, 1, NOW(), NOW()),

-- Módulo (206)
(1, 1, 206, 1, 1, NOW(), NOW()),
(1, 1, 206, 2, 1, NOW(), NOW()),
(1, 1, 206, 3, 1, NOW(), NOW()),
(1, 1, 206, 5, 1, NOW(), NOW()),
(0, 1, 206, 6, 1, NOW(), NOW()),
(1, 1, 206, 7, 1, NOW(), NOW()),

-- Reclamação (207)
(1, 1, 207, 1, 1, NOW(), NOW()),
(1, 1, 207, 2, 1, NOW(), NOW()),
(1, 1, 207, 3, 1, NOW(), NOW()),
(1, 1, 207, 5, 1, NOW(), NOW()),
(0, 1, 207, 6, 1, NOW(), NOW()),
(1, 1, 207, 7, 1, NOW(), NOW()),

-- Recurso (208)
(1, 1, 208, 1, 1, NOW(), NOW()),
(1, 1, 208, 2, 1, NOW(), NOW()),
(1, 1, 208, 3, 1, NOW(), NOW()),
(1, 1, 208, 5, 1, NOW(), NOW()),
(0, 1, 208, 6, 1, NOW(), NOW()),
(1, 1, 208, 7, 1, NOW(), NOW()),

-- Notificação (209)
(1, 1, 209, 1, 1, NOW(), NOW()),
(1, 1, 209, 2, 1, NOW(), NOW()),
(1, 1, 209, 3, 1, NOW(), NOW()),
(1, 1, 209, 5, 1, NOW(), NOW()),
(0, 1, 209, 6, 1, NOW(), NOW()),
(1, 1, 209, 7, 1, NOW(), NOW()),

-- Certificado (210) 
(1, 1, 210, 1, 1, NOW(), NOW()),
(1, 1, 210, 2, 1, NOW(), NOW()),
(1, 1, 210, 3, 1, NOW(), NOW()),
(1, 1, 210, 5, 1, NOW(), NOW()),
(0, 1, 210, 6, 1, NOW(), NOW()),
(1, 1, 210, 7, 1, NOW(), NOW()),

-- Modulo Interface (211) 
(1, 1, 211, 1, 1, NOW(), NOW()), 
(1, 1, 211, 2, 1, NOW(), NOW()), 
(1, 1, 211, 3, 1, NOW(), NOW()), 
(1, 1, 211, 5, 1, NOW(), NOW()), 
(0, 1, 211, 6, 1, NOW(), NOW()), 
(1, 1, 211, 7, 1, NOW(), NOW())

ON CONFLICT ("fkPerfilUsuario", "fkRotina", "fkAcao") DO NOTHING;
