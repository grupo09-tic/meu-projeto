# Projeto AnexoTech



## 🚀 Como o Backend Funciona? (A Lógica Geral)
Nosso backend não é apenas um monte de arquivos soltos. Ele é organizado em **10 Camadas de Negócio** e **4 Pastas de Apoio**. A lógica é que cada arquivo tenha apenas **UMA responsabilidade** (Princípio de Responsabilidade Única).

### Fluxo de uma Requisição:
1.  O **Mobile/Web** envia um dado (ex: Login).
2.  O **Middleware** intercepta, identifica a empresa (Tenant) e checa a segurança.
3.  O **Controller** recebe o pedido e chama o "cérebro" (**Service**).
4.  O **Service** aplica as regras de negócio e pede ao **Repository** para falar com o Banco.
5.  A resposta volta limpa pelo **DTO** para o usuário.

---

## 📂 Guia de Pastas (`backend/src/`)

### 🏗️ As 10 Camadas de Negócio
- `entities/`: Representação pura do que o dado É (Usuário, Comunicado, etc).
- `factories/`: Onde "montamos" as classes e injetamos dependências.
- `repositories/`: Onde escrevemos as queries SQL (acesso ao banco).
- `routes/`: O mapa de todas as URLs da nossa API (v1).
- `controllers/`: O "garçom" que recebe a requisição e entrega a resposta HTTP.
- `services/`: O "cérebro" onde todas as regras de negócio acontecem.
- `middlewares/`: Segurança, Autenticação e Tratamento de Erros.
- `policies/`: Onde definimos quem pode o quê (Permissões de RH/Admin).
- `contexts/`: Onde guardamos os dados da empresa (tenant) atual da requisição.
- `dtos/`: Filtros de segurança que limpam dados na entrada e saída.

### 🛠️ As 4 Pastas de Apoio (Técnico)
- `config/`: Configurações de Banco de Dados e Variáveis de Ambiente.
- `models/`: Desenho técnico das tabelas do banco (Tipos de dados).
- `utils/`: Caixa de ferramentas (Helpers e códigos reaproveitáveis).
- `validators/`: Validadores de formatos (E-mail, CPF, Telefone, etc).

---

📖 **Para entender melhor o fluxo de dados, leia o [ARQUITETURA.md](./ARQUITETURA.md).**
