// Esse é o 'chef de cozinha' que prepara os pratos de empresa.
// Ele tira o trabalho do garçom (rotas) de saber como preparar.

const cadastrarEmpresa = (req, res) => {
    // req.body é onde chegam as informações que o cliente enviou (nome, cnpj, etc)
    const { nome, cnpj } = req.body;

    // Simulação de salvamento no banco de dados
    return res.json({
        mensagem: 'Empresa cadastrada com sucesso pelo Controlador!',
        empresaRecebida: nome,
        documento: cnpj
    });
};

// Exportando o objeto com as funções que criamos
module.exports = {
    cadastrarEmpresa
};
