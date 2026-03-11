/**
 * SERVIDOR PRINCIPAL (O HOST DO RESTAURANTE)
 * 
 * Este arquivo é o "Cérebro" que liga tudo.
 */

// 1. IMPORTAÇÕES (PEDIR OS INGREDIENTES)
// Aqui estamos chamando o Express para dentro do nosso código.
const express = require('express'); 

// importando o cardapio

const rotasDeEmpresas = require('./routes/tenantRoutes');


// 2. CONFIGURAÇÃO (MONTAR A COZINHA)
// TAREFA: Crie uma constante chamada 'app' que recebe a função express().
// Dica: const nomeDaVariavel = express();
const app = express();

// TAREFA: Use o método .use() do seu 'app' para aceitar JSON.
// Dica: app.use(express.json());
app. use(express.json());

// linha para 'ativar' o menu
app.use('/tenants', rotasDeEmpresas);


// 3. ROTAS (O CARDÁPIO - O QUE O CLIENTE PODE PEDIR)
// TAREFA: Complete a função abaixo para que ela responda algo legal.
// O 'req' é o pedido do cliente. O 'res' é a resposta do garçom.
app.get('/', (req,res) => {res.json({ mensagem: "Bem-vindo ao Proton!" }); });
    // TAREFA: Use res.json({ ... }) para enviar um objeto de volta.
    // Exemplo: return res.json({ mensagem: "Bem-vindo ao Proton!" });
    


// 4. INICIALIZAÇÃO (ABRIR A PORTA)
// TAREFA: Defina em qual porta o servidor vai rodar (ex: 3000).
const PORTA = 3000;

// TAREFA: Use o método .listen() para ligar o servidor.
// Dica: app.listen(PORTA, () => { console.log(...) });
app.listen(PORTA, () => {console.log("Servidor rodando na porta 3000!");});
    // Escreva um console.log aqui para você saber que deu certo!
    



/** 
 * PRÓXIMOS PASSOS NO TERMINAL:
 * 1. cd backend
 * 2. npm init -y
 * 3. npm install express
 * 4. Tente completar os campos vazios acima!
 */
