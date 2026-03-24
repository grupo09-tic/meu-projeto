/**
 * AUTH CONTROLLER (O Tradutor Web)
 * 
 * Este arquivo foi construído por você durante a Missão 6!
 */

const authController = (authService) => {
    return async (req, res, next) => {
        try {
            // 1. Extrair email e senha do corpo da requisição
            const { email, senha } = req.body;

            // 2. Chamar o serviço de login (O Cérebro)
            const usuario = await authService.login(email, senha);

            // 3. Sucesso! Responder para o App Mobile/Web com JSON
            return res.status(200).json({
                mensagem: "Login realizado com sucesso!",
                dados: usuario
            });

        } catch (error) {
            // 4. Se algo deu errado (senha errada, etc), passa para o Error Handler
            next(error);
        }
    };
};

module.exports = authController;
