const express = require('express')
const banco = require('mysql2/promise')
const app = express()
const porta = 3000;

//criar conexão com banco de dados

//loucura
let db;

async function conectar() {
    db = await banco.createConnection({
        host:'localhost',
        user:'root',
        password:'senai',
        database:'trabalho'
    });

    console.log('Conectado ao banco');
}

conectar();

// middleware pra coisar o formulário
app.use(express.urlencoded({ extended: true }));

// configurar EJS
app.set('view engine', 'ejs');

// rota GET pra abrir la 
app.get('/cadastro', (req, res) => {
    res.render('pessoa/cadastro');
});
    //buscando pelo clientes la no banco
app.get('/', async (req, res) => {
    try {
        const [clientes] = await db.query('SELECT * FROM clientes');
        const [produtos] = await db.query('SELECT * FROM produtos');

        res.render('loguin', {
            clientes,
            produtos
        });
    } catch (err) {
        console.error(err);
        res.send('tudo errado.');
    }
});
//mais sql, aq o cara la q vai eniar as informacoes
app.post('/cadastro', (req, res) => {
    const { nome, email } = req.body;

    const sql = 'INSERT INTO clientes (nome, email) VALUES (?, ?)';

    //se der erro no brique
    db.query(sql, [nome, email], (err) => {
        if (err) {
            console.error(err);
            return res.send('tudo errado');
        }

        res.redirect('/loguin');
    });
});
    //o cara q envia dnovo soque produto
app.post('/produtos', async (req, res) => {
    const { nome, preco } = req.body;

    try {
        const sql = 'INSERT INTO produtos (nome, preco) VALUES (?, ?)';
        await db.query(sql, [nome, preco]);

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.send('tudo errado');
    }
});

//
app.get('/cadastroP', (req, res) => {
    res.render('produto/cadastroP');
});


// começa
app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});