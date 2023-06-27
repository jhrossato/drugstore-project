const express = require('express');
const app = express();
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const produtoRouter = require('./routes/produto');
var cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/produtos', produtoRouter);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
})