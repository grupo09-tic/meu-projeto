/**
 * AUTH ROUTES (O Cardápio de Acesso)
 * 
 * Este arquivo define as rotas de login e segurança.
 */

const express = require('express');
const router = express.Router();

// 1. Chamar a nossa FÁBRICA (O Montador)
const makeAuthHandler = require('../factories/authFactory');

// 2. Definir a rota de login (Verbo POST)
// Quando alguém bater em /auth/login, a fábrica entrega o Handler montado.
router.post('/login', makeAuthHandler());

module.exports = router;
