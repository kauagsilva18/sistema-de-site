const express = require('express')
const app = express()
const porta = 3000;

// middleware para pegar dados do formulário
app.use(express.urlencoded({ extended: true }));

// configurar EJS
app.set('view engine', 'ejs');

// rota GET (abre o formulário)
app.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

// rota POST (recebe os dados)
app.post('/cadastro', (req, res) => {
    const { email, password } = req.body;

    console.log('Email:', email);
    console.log('Senha:', password);

    // aqui você poderia salvar no banco

    // redireciona para login
    res.redirect('/');
});

app.get('/', (req, res) => {
    res.render('loguin');
});
//

app.get('/entrar', (req, res) => {
    res.render('entrar');
});

app.post('/entrar', (req, res) => {
    const { email, password } = req.body;

    console.log('entrar:', email, password);

    res.send('Login realizado!');
});
//
app.get('/cadastroP', (req, res) => {
    res.render('produto/cadastroP'); // vai abrir cadastroP.ejs
});


// iniciar servidor
app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});