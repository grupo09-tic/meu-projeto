# Backend-Anexo Tecnologia

> API REST do Projeto  Anexo Tecnologia - Backend para gestão de RH e empresas

## O que é isso?

API REST que fornece endpoints para:
- **Autenticação** - Login seguro com JWT
- **Gestão de Empresas** - CRUD de tenants (empresas/clientes)

### Arquitetura (Multi-Tenancy)

```
┌─────────────────────────────────────────────────────────┐
│                    BACKEND PROTON                        │
├─────────────────────────────────────────────────────────┤
│  Cliente 1 (Tech Solutions)  │  Cliente 2 (Inovatech)   │
│  ─────────────────────────  │  ──────────────────────  │
│  Funcionários, RH, Login    │  Funcionários, RH, Login │
├─────────────────────────────────────────────────────────┤
│              CAMADA DE DADOS (PostgreSQL)               │
│         Schema separado por tenant_id                   │
└─────────────────────────────────────────────────────────┘
```

Cada empresa (tenant) tem seus próprios dados, mas compartilham a mesma API.

---

## Pré-requisitos

| Software | Versão | Para que serve |
|----------|--------|----------------|
| Node.js | 18+ | Runtime do servidor |
| npm | 9+ | Gerenciador de pacotes |
| PostgreSQL | 14+ | Banco de dados |

### Verificar instalação

```bash
node --version    # deve mostrar v18.x.x ou superior
npm --version     # deve mostrar 9.x.x ou superior
psql --version    # deve mostrar 14.x ou superior
```

---

## Instalação

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd Proton/backend
```

### 2. Instalar dependências

```bash
npm install
```

> Isso instala: Express, JWT, bcrypt, PostgreSQL client, etc.

### 3. Configurar variáveis de ambiente

```bash
# Copiar o arquivo de exemplo
cp ".env. (example)" .env

# Editar com suas configurações
nano .env
```

O `.env` deve conter:

```env
PORT=3000
JWT_SECRET=sua_chave_secreta_aqui_muito_longa_e_aleatoria
DATABASE_URL=postgres://postgres:SUA_SENHA@localhost:5432/AnexoTecnologia
```

⚠️ **Importante:** Substitua `SUA_SENHA` pela senha do seu PostgreSQL.

### 4. Criar o banco de dados

```bash
# Entrar no PostgreSQL
sudo -u postgres psql

# Criar banco
CREATE DATABASE "AnexoTecnologia";

# Sair
\q
```

### 5. Rodar o servidor

```bash
npm start
```

Saída esperada:
```
🔥 Servidor rodando na porta 3000!
📍 Endpoints disponíveis:
   GET  /
   POST /auth/login
   GET  /tenants
   POST /tenants
```

---

## Como funciona

### Fluxo de Login (Passo a Passo)

```
┌──────────┐     1. POST /auth/login      ┌──────────────┐
│ Cliente  │ ──────────────────────────▶  │   Express     │
│          │     {email, senha}           │   Server      │
│          │                              │               │
│          │  2. Buscar usuário           │  4. Gerar     │
│          │     no banco                 │    JWT Token  │
│          │     ↓                         │    ↓         │
│          │  3. Comparar                  │               │
└──────────┘     senha com bcrypt         └──────────────┘
     ↑                                        │
     │                                        │
     └────── { token: "eyJhbGci..." } ────────┘
```

### Tecnologias utilizadas

| Tecnologia | Para que serve | Analogia |
|------------|----------------|----------|
| **Express** | Framework web | O garçom que recebe pedidos |
| **JWT** | Token de autenticação | Crachá de acesso temporário |
| **bcrypt** | Criptografia de senhas | Cofre de senha |
| **pg** | Cliente PostgreSQL | Telefone para o banco |
| **dotenv** | Variáveis de ambiente | Agenda de configurações |

---

## Endpoints

### Rotas Públicas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Status do servidor |
| POST | `/auth/login` | Fazer login |

### Rotas Protegidas (requer token)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/tenants` | Listar empresas |
| POST | `/tenants` | Criar empresa |

---

## Como testar

### 1. Verificar se servidor está rodando

```bash
curl http://localhost:3000/
```

Resposta:
```json
{"status":"ok","mensagem":"Bem-vindo ao Proton!","versao":"1.0.0"}
```

### 2. Fazer login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"seu_email@anexotech.com","senha":"sua_senha"}'
```

Resposta (sucesso):
```json
{
  "mensagem": "Login realizado com sucesso",
  "usuario": {
    "id": 1,
    "email": "seu_email@anexotech.com",
    "nome": "Nome do Usuário",
    "tenant_id": 1
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Acessar rota protegida

```bash
curl http://localhost:3000/tenants \
  -H "Authorization: Bearer TOKEN_AQUI"
```

---

## Estrutura de arquivos

```
backend/
├── src/
│   ├── index.js           # Servidor principal
│   ├── config/
│   │   └── database.js    # Conexão PostgreSQL
│   ├── controllers/
│   │   ├── authController.js
│   │   └── tenantController.js
│   ├── services/
│   │   ├── authService.js
│   │   └── tenantService.js
│   ├── repositories/
│   │   ├── userRepository.js
│   │   └── tenantRepository.js
│   ├── middlewares/
│   │   ├── authMiddleware.js    # Verifica token JWT
│   │   └── globalErrorHandler.js # Trata erros
│   └── routes/
│       ├── authRoutes.js
│       └── tenantRoutes.js
├── .env                   
├── .env\ \(example\)      # Modelo de configurações
├── .gitignore
└── package.json
```

---

## FAQ - Perguntas Frequentes

### Erro: "Cannot connect to database"

1. Verificar se PostgreSQL está rodando:
   ```bash
   sudo service postgresql status
   ```

2. Iniciar se necessário:
   ```bash
   sudo service postgresql start
   ```

### Erro: "Token inválido"

Significa que o token expirou ou foi malformado. Faça login novamente.

### Como gerar senha criptografada para teste?

```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('sua_senha', 10))"
```

Copie o hash gerado e insira no banco de dados.

---

## Autores

- Desenvolvimento: Facundo

## Licença

ISC
