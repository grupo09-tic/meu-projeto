const { pool } = require('./config/database');

async function testarConexao() {
    try {
        const resultado = await pool.query('SELECT NOW()');
        console.log('Conexão funcionou!');
        console.log('Hora do banco:', resultado.rows[0].now);
    } catch (erro) {
        console.error('Erro de conexão:', erro.message);
    } finally {
        pool.end();
    }
    
}

testarConexao();