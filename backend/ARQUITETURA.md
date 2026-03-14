# 🏗️ Arquitetura do Projeto Anexo Tecnologia 

Este documento descreve a organização técnica e as diretrizes arquiteturais para o desenvolvimento da plataforma Anexo Tecnologia, abrangendo Backend, Frontend e Mobile.

## 🚀 1. Nome e Objetivo
**Projeto:** Anexo Tecnologia   
**Objetivo:** Plataforma corporativa multi-tenant (SaaS) para avaliações de desempenho, canais de denúncia anônimos e comunicação interna. O sistema garante o isolamento de dados entre diferentes empresas clientes através de uma arquitetura segura e escalável.

## 🛠️ 2. Tecnologias Utilizadas

### 🔙 2.1 Backend (Servidor de API)
- **Node.js**: Ambiente de execução Javascript no servidor.
- **Express**: Framework para gerenciamento de rotas e requisições HTTP.
- **PostgreSQL**: Banco de dados relacional para armazenamento persistente.
- **JWT (JSON Web Token)**: Padrão para autenticação e troca segura de informações.

### 💻 2.2 Frontend (Portal Web)
- **React com TypeScript**: Biblioteca para interfaces de usuário com tipagem estática.
- **Componentização**: Divisão da interface em partes menores e reutilizáveis.
- **Tailwind CSS**: Framework de estilização baseado em classes utilitárias.

### 📱 2.3 Aplicação Mobile (App do Colaborador)
- **React Native**: Desenvolvimento de aplicativos nativos para Android e iOS.
- **Expo**: Conjunto de ferramentas para facilitar o desenvolvimento mobile.

### 🔧 2.4 Ferramentas
- **VS Code**: Editor de código.
- **Postman**: Teste de endpoints da API.
- **Android Studio / Xcode**: Emuladores para testes mobile.
- **Docker**: Padronização do ambiente de banco de dados e infraestrutura.

## 📂 3. Organização do Sistema

### 3.1 Estrutura de Pastas (Backend)
A organização técnica segue o padrão de **Arquitetura em Camadas**:

```text
backend/
├── src/
│   ├── config/      # Configurações de conexões e variáveis globais.
│   ├── routes/      # Definição dos endereços (endpoints) da API.
│   ├── controllers/ # Intermediários: processam a entrada e geram a saída.
│   ├── services/    # Lógica de Negócio: onde as regras do sistema são aplicadas.
│   ├── repositories/# Acesso a Dados: comunicação direta com o Banco de Dados.
│   ├── middlewares/ # Funções de Interceptação: segurança e validações prévias.
│   └── index.js     # Arquivo principal que inicia a aplicação.
```

### 3.2 Estrutura de Pastas (Frontend)
O Frontend segue uma organização modular para facilitar a manutenção e o reaproveitamento de componentes:

```text
Frontend/src/
├── assets/          # Imagens, logotipos e ícones do sistema.
├── components/      # Partes reutilizáveis da interface:
│   ├── common/      # Botões, Inputs, Spinners (Básicos).
│   ├── layout/      # Navbar, Sidebar, Footer (Estrutura).
│   └── modules/     # Componentes complexos (Formulários, Gráficos).
├── contexts/        # Gerenciamento de Estado Global (Autenticação, Tema).
├── hooks/           # Lógica personalizada e reutilizável do React.
├── pages/           # Telas completas do sistema (Login, Dashboard).
├── services/        # Chamadas de API e integração com o Backend.
├── styles/          # Configurações globais do Tailwind e CSS.
└── types/           # Definições de Interfaces e Tipos (TypeScript).
```

### 3.3 Módulos Funcionais
O sistema é dividido nos seguintes módulos de negócio, conforme documentado no EAP e Requisitos:
- **Core & Tenancy:** Gestão de empresas clientes e isolamento de dados.
- **Auth & Security:** Gestão de usuários, perfis de acesso e autenticação.
- **Comunicação Interna:** Mural de avisos com sistema de "Ciente".
- **Canal de Ética:** Sistema de denúncias anônimas e seguras.
- **Avaliação de Desempenho:** Gestão de questionários e coleta de feedbacks corporativos.

## 🧠 4. Responsabilidades das Camadas

1.  **Routes**: Mapeia as URLs da aplicação e as associa aos controladores correspondentes.
2.  **Controllers**: Recebe os dados enviados pelo usuário, solicita o processamento à camada de serviço e retorna o resultado final (sucesso ou erro).
3.  **Services**: Camada onde residem as regras de negócio. Valida se uma operação é permitida, processa cálculos e garante a integridade das ações antes de salvar os dados.
4.  **Repositories**: Abstrai as consultas ao banco de dados. É a única camada que escreve ou lê informações do PostgreSQL.

## 🏃 5. Como Executar a Aplicação

### Backend:
1. Entre na pasta: `cd backend`
2. Instale as dependências: `npm install`
3. Configure o arquivo `.env` com as credenciais do seu PostgreSQL.
4. (Opcional) Inicie o banco via Docker: `docker-compose up -d`
5. Inicie o servidor: `node src/index.js`

### Frontend:
1. Entre na pasta: `cd Frontend`
2. Instale as dependências: `npm install`
3. Inicie o projeto: `npm start` (ou `npm run dev`)

## ⚠️ 6. Diretrizes para a Equipe
- **Isolamento (Multi-tenancy)**: Sempre inclua o `tenant_id` em todas as consultas e operações de banco de dados.
- **Segurança (Criptografia)**: Senhas nunca devem ser salvas em texto puro; utilize sempre `bcrypt` para gerar o hash antes de persistir no repositório.
- **Tratamento de Erros**: Utilize blocos `try/catch` nos controladores para garantir que a API retorne erros amigáveis (JSON) ao usuário.
- **Documentação**: Mantenha os comentários de código e este arquivo de arquitetura sempre atualizados.

---
*Documentação Técnica - Equipe Anexo Tecnologia*
