const express = require('express');
const app = express();

const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const produtoRouter = require('./routes/produto');
const categoriaRouter = require('./routes/categoria');
const uploadRouter = require('./routes/upload');
const database = require('./database/db');
const Usuario = require('./models/usuario');
const Produto = require('./models/produto');
const Categoria = require('./models/categoria');
const Carrinho = require('./models/carrinho');

var cors = require('cors');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, './images')
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname)
    }
  })
  
  const uploadImg = multer({storage: storage});




app.use(cors());
app.use(express.json({limit: '50mb', extended: true}));
app.use('/image', express.static('./images'));
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/produtos', produtoRouter);
app.use('/categorias', categoriaRouter);

app.post('/upload', uploadImg.single('image'), (req, res) => {
  res.send("image uploaded");
});

// app.get('/image/:nome', (req, res) => {
//   const imageName = req.params.nome;
//   const fileSystem = new FileSystemDirectoryEntry();
//   const file = fileSystem.getFile('./images/'+imageName);
//   // imageName.replace('%20', ' ');
//   //console.log('aaaa' + imageName)
//   //const response = fetch('./images/'+imageName);
  
//   const reader = new FileReader();
//   res.send(reader.readAsDataURL(file));
// });

function configureModel(){
  database.sync({ alter: false })
}

configureModel();

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
})