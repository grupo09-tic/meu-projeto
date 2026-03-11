// Esse arquivo cuida tudo o que tem a ver com empresas clientes

/* Aqui embaixo o 'mini garçom' que cuida só desse menu
    menú especializado para empresas */

const express = require('express')
const router = express.Router();

// 1. IMPORTAR O CONTROLADOR (O CHEF DA COZINHA)
const { cadastrarEmpresa } = require('../controllers/tenantController');


//Aqui a rota para cadastrar empresas (O metodo POST = Enviar dados)
// TAREFA: Agora o garçom (rota) só passa o pedido para o chef (controlador)
router.post('/', cadastrarEmpresa);


// exportando para o anfitrão (index.js) poder ver
module.exports = router;




