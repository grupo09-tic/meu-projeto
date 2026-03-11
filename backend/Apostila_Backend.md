# 📔 Apostila de Backend: Do Zero ao Herói (Projeto Proton)

Esta apostila é o seu guia de consulta rápida para os conceitos fundamentais de Backend e Arquitetura Profissional.

---

## 🍽️ A Analogia do Restaurante (Revisitada)
Para entender a arquitetura profissional que o **Erick Wendel** utiliza, imagine um restaurante de alta gastronomia:

1.  **Handler (Anfitrião):** Recebe o cliente na porta (`index.js`).
2.  **Routes (Garçom):** Anota o pedido e leva para o setor certo (`tenantRoutes.js`).
3.  **Controller (Chefe de Fila):** Coordena o que deve ser feito com o pedido.
4.  **Services (Chef de Cozinha):** Onde a **Mágica (Regra de Negócio)** acontece. Ele sabe a receita original.
5.  **Repositories (Estoquista):** O único que mexe na geladeira/despensa (Banco de Dados).
6.  **Entities (Molde do Prato):** Define como o prato deve parecer (Nome, Preço, Ingredientes).
7.  **Factories (Montador):** Junta o Chef com o Estoquista e entrega tudo pronto para o Garçom.

---

## 🏗️ Estrutura de Pastas Profissional (O Mapa da Mina)
No seu projeto `backend/src/`, as pastas devem seguir esta lógica:

*   `/routes`: Onde ficam os caminhos que o cliente acessa (URLs).
*   `/controllers`: Onde recebemos os dados brutos e enviamos a resposta final.
*   `/services`: O cérebro! Onde validamos se o CNPJ é real, se a empresa existe, etc.
*   `/repositories`: Onde escrevemos o código que salva no Banco de Dados.
*   `/entities`: A "planta baixa" dos nossos objetos (Empresa, Usuário, etc).
*   `/middlewares`: Os "Seguranças". Filtram quem pode entrar.
*   `/policies`: O "Controle de Acesso" (RBAC). Define QUEM pode fazer O QUÊ.
*   `/context`: O "Identificador de Empresa". Garante o isolamento (Multi-tenant).
*   `/dtos`: Os "Filtros de Segurança". Garante que só dados válidos entrem no sistema.
*   `/util`: Ferramentas compartilhadas (Validadores, Formatadores).

---

## 🛠️ O Esqueleto Padrão do Servidor (index.js)
```javascript
const express = require('express');
const app = express();
app.use(express.json()); // Garçom entende JSON (O "tradutor")

// Rota principal (O "Bem-vindo")
app.get('/', (req, res) => res.json({ mensagem: "Bem-vindo ao Proton!" }));

// Importando rotas modulares (O "Menu especializado")
const tenantRoutes = require('./routes/tenantRoutes');
app.use('/tenants', tenantRoutes);

const PORTA = 3000;
app.listen(PORTA, () => console.log(`Servidor rodando na porta ${PORTA}!`));
```

---

## ⌨️ Comandos Essenciais do Terminal
*   `cd backend`: Entrar na pasta do backend.
*   `npm init -y`: Criar o "Alvará" (package.json).
*   `npm install express`: Contratar o "Garçom" (Express).
*   `node src/index.js`: Ligar o servidor.
*   `curl -X POST ...`: Testar se o seu servidor está aceitando pedidos.

---

## 💡 Glossário para Iniciantes (Nível Sênior)
*   **S.O.L.I.D:** Princípios para o código não virar uma "bagunça de espaguete".
*   **Separation of Concerns:** Cada arquivo faz apenas UMA coisa (O garçom não cozinha!).
*   **Multi-tenancy:** Um único sistema que atende várias empresas com dados isolados.
*   **RBAC:** Controle de quem pode fazer o quê (Admin vs Colaborador).
