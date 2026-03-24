// Esse arquivo cuida tudo o que tem a ver com empresas clientes

/* Aqui embaixo o 'mini garçom' que cuida só desse menu
    menú especializado para empresas */

const express = require('express')
const router = express.Router();

// 1. IMPORTAR O CONTROLADOR (O CHEF DA COZINHA)
const { cadastrarEmpresa } = require('../controllers/tenantController');


// 2. IMPORTAR O MIDDLEWARE DE AUTENTICAÇÃO
const authMiddleware = require('../middlewares/authMiddleware');

// 3. ROTA GET PROTEDIGA - Listar empresas (precisa de token)
router.get('/', authMiddleware, (req, res) => {
    res.json({
        mensagem: 'Lista de empresas (protegida)',
        empresas: [
            { id: '1', nome: 'Empresa Teste 01' },
            { id: '2', nome: 'Empresa Teste 02' }
        ]
    
    });
});




//Aqui a rota para cadastrar empresas (O metodo POST = Enviar dados)
// TAREFA: Agora o garçom (rota) só passa o pedido para o chef (controlador)
router.post('/', cadastrarEmpresa);


// exportando para o anfitrão (index.js) poder ver
module.exports = router;




