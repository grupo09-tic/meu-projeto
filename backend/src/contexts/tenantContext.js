/**
 * O IDENTIFICADOR DE EMPRESA (O "Post-it" da Requisição)
 * 
 * Por que este arquivo existe? 
 * Em sistemas Multi-tenant, precisamos saber de QUAL EMPRESA é o dado
 * sem precisar passar o ID da empresa em cada função do sistema.
 */

class TenantContext {
    constructor() {
        // Onde guardamos o ID da empresa temporariamente
        this._tenantId = null;
    }

    // "CARIMBAR": Salva o ID da empresa no contexto
    setTenantId(id) {
        this._tenantId = id;
    }

    // "LER": Recupera o ID da empresa para usar no Banco de Dados
    getTenantId() {
        return this._tenantId;
    }
}

// Exportamos uma "Instância" (Uma cópia pronta para uso)
module.exports = new TenantContext();
