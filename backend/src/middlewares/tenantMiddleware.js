const tenantContext = require('../contexts/tenantContext');

/**
 * MIDDLEWARE DE TENANT (O SEGURANÇA)
 * 
 * Este middleware intercepta a requisição e garante que sabemos
 * de qual empresa (tenant) os dados pertencem.
 */
const tenantMiddleware = (req, res, next) => {
    // 1. Extrair o ID do cabeçalho 'x-tenant-id'
    const tenantId = req.headers['x-tenant-id'];

    // 2. Validação: Se não houver ID, interrompemos a requisição
    if (!tenantId) {
        return res.status(400).json({ 
            status: "erro",
            mensagem: "Identificador de empresa (x-tenant-id) é obrigatório no cabeçalho." 
        });
    }

    // 3. 'Carimbar' o contexto global da requisição com o ID da empresa
    tenantContext.setTenantId(tenantId);
    
    console.log(`[TENANT LOG]: Requisição processada para a empresa: ${tenantId}`);

    // 4. Prossiga para o próximo Middleware ou Controller
    next();
};

module.exports = tenantMiddleware;
