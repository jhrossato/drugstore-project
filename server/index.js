const express = require('express');
const app = express();
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const produtoRouter = require('./routes/produto');
const categoriaRouter = require('./routes/categoria');
const database = require('./database/db');
const Usuario = require('./models/usuario');
const Produto = require('./models/produto');
const Categoria = require('./models/categoria');
const Carrinho = require('./models/carrinho');

var cors = require('cors');

app.use(cors());
app.use(express.json({limit: '50mb', extended: true}));
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/produtos', produtoRouter);
app.use('/categorias', categoriaRouter);


function configureModel(){
  database.sync({ alter: true })
}

configureModel();

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
})