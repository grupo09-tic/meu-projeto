/**
 * AUTH SERVICE (O Cérebro da Autenticação)
 * 
 * Este arquivo contém a regra de negócio do Login.
 */

const jwt = require('jsonwebtoken'); // o crachá digital
const bcrypt = require('bcryptjs'); // compara senhas criptogragicas
const userDTO = require('../dtos/userDTO');

class AuthService {
    // O Service precisa de um 'Repositorio' para buscar dados no banco
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async login(email, senha) {
        // 1. Pedir ao 'Bibliotecario' (Repository) para buscar o usuário pelo email
        const usuario = await this.userRepository.findByEmail(email);

        // 2. Se o usuário não existir...
        if (!usuario) {
            throw new Error("Usuário não encontrado.");
        }

        // 3. COMPARAR A SENHA COM BCRYPT (hash):
       
        const senhasBatem = bcrypt.compareSync(senha, usuario.senha_hash);
        if (!senhasBatem) {
            throw new Error("Senha incorreta.");
        }

        // 4. GERAR TOKEN JWT
        const token = jwt.sign(
            { userId: usuario.id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        
        // 5. Se chegou aqui, deu tudo certo! 
        // Retornamos o usuário "limpo" + token
        return {
            usuario: userDTO(usuario),
            token: token
}
}
}
module.exports = AuthService;
