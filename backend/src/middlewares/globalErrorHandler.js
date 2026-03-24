/**
 * MIDDLEWARE DE TRATAMENTO DE ERROS GLOBAL
 * 
 * Este arquivo garante que qualquer erro que ocorra no sistema
 * seja devolvido no mesmo formato JSON para o cliente.
 */

const globalErrorHandler = (err, req, res, next) => {
    // 1. Log de erro para o desenvolvedor ver no console
    console.error(`[ERRO NO SERVIDOR]: ${err.message}`);
    console.error(err.stack); // Mostra onde no código o erro aconteceu

    // 2. Se o erro for de validação ou algo que nós mesmos lançamos
    const status = err.statusCode || 500;
    const mensagem = err.message || "Erro interno do servidor.";

    // 3. Resposta padronizada em JSON
    res.status(status).json({
        status: "erro",
        mensagem: mensagem,
        detalhes: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });

    // Note que só mostramos o 'stack' do erro se estivermos em desenvolvimento
    // para não expor segredos do código na internet.
};

module.exports = globalErrorHandler;
