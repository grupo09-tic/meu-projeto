// Aqui embaixo o index (anfitrão)

const express = require('express'); 
const rotasDeEmpresas = require('./routes/tenantRoutes');
const app = express();
app. use(express.json());
app.use('/tenants', rotasDeEmpresas);
app.get('/', (req,res) => {res.json({ mensagem: "Bem-vindo ao Proton!" }); });
const PORTA = 3000;
app.listen(PORTA, () => {console.log("Servidor rodando na porta 3000!");});