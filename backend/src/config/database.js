const { Pool } = require('pg');
require('dotenv').config({ path: require('path').resolve(__dirname,'../../.env')});

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'AnexoTech',
    user: 'postgres',
    password: process.env.DB_PASSWORD
});
pool.on('connect', () => {
    console.log('Banco de dados conectado baby!');
});
pool.on('error', (err) => {
    console.error('Erro no banco de dados:', err);
    process.exit(1);
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
};