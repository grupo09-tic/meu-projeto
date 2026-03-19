/**
 * DTO DE USUÁRIO (DATA TRANSFER OBJECT)
 * 
 * Este arquivo define o "molde" dos dados de um usuário
 * que entram e saem da nossa API.
 */

const userDTO = (user) => {
    // 1. O que nós queremos que saia da API?
    // Nós nunca queremos devolver a senha (password) para o cliente.
    return {
        id: user.id,
        nome: user.nome,
        email: user.email,
        departamentoId: user.departamentoId,
        tenantId: user.tenantId,
        criadoEm: user.createdAt
    };
};

module.exports = userDTO;
