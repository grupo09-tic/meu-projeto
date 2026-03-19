/**
 * SERVIDOR PRINCIPAL (O HOST DO RESTAURANTE)
 * 
 * Este arquivo é o "Cérebro" que liga tudo.
 *Versão atualizada: Atividade 06
 */

// 1. IMPORTAÇÕES
const express = require('express');
require('dotenv').config();

const rotasDeAuth = require('./routes/authRoutes');
const rotasDeEmpresas = require('./routes/tenantRoutes');
const globalErrorHandler = require('./middlewares/globalErrorHandler');

// 2. CONFIGURAÇÃO
const app = express();

app.use(express.json());

// Habilitar CORS para testes locais
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// 3. ROTAS PÚBLICAS
app.get('/', (req, res) => {
    res.json({ 
        status: 'ok', 
        mensagem: "Bem-vindo ao Proton!",
        versao: "1.0.0",
        data: new Date().toISOString()
    });
});

// 4. ROTAS DE AUTENTICAÇÃO (/auth)
app.use('/auth', rotasDeAuth);

// 5. ROTAS DE EMPRESAS (/tenants)
app.use('/tenants', rotasDeEmpresas);

// 6. MIDDLEWARE DE ERRO GLOBAL
// Este middleware deve ser O ÚLTIMO a ser registrado
app.use(globalErrorHandler);

// 7. INICIALIZAÇÃO
const PORTA = process.env.PORT || 3000;

app.listen(PORTA, () => {
    console.log(`🔥 Servidor rodando na porta ${PORTA}!`);
    console.log(`📍 Endpoints disponíveis:`);
    console.log(`   GET  /`);
    console.log(`   POST /auth/login`);
    console.log(`   GET  /tenants`);
    console.log(`   POST /tenants`);
});

module.exports = app;


