const express = require('express');
const app = express();
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');

app.use(express.json());
app.use('/login', loginRouter);
app.use('/users', usersRouter);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
})