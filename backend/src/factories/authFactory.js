/**
 * AUTH FACTORY (O Montador do Sistema)
 * 
 * Este arquivo é responsável por instanciar e conectar todas 
 * as camadas necessárias para o Login funcionar.
 * (Injeção de Dependência)
 */

const AuthService = require('../services/authService');
const userRepository = require('../repositories/userRepository');
const authController = require('../controllers/authController');

const makeAuthController = () => {
    // 1. Criar a instância do Repositório (Bibliotecário)
    const repository = userRepository;

    // 2. Criar a instância do Serviço (Cérebro) e Injetar o repositório
    const service = new AuthService(repository);

    // 3. Criar a instância do Handler (Tradutor) e Injetar o serviço
    const controller = authController(service);

    // 4. Retornar o Handler pronto para uso pelas Rotas
    return controller;
};

module.exports = makeAuthController;
