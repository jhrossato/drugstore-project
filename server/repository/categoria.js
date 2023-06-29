const Categoria = require('../models/categoria');

async function getByName(produtoNome) {
    try {
      return await Categoria.findOne({
        where: {nome: produtoNome}
      }).then((c) => {
        return c;
      });
      //   console.log(nome)
      // const query = 
      // `SELECT * FROM TB_Categoria WHERE nome = '${nome}'`;
      // const result = await database.execute(query);
      // return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getAll() {
    try {
      return await Categoria.findAll();
      //   console.log(nome)
      // const query = 
      // `SELECT * FROM TB_Categoria WHERE nome = '${nome}'`;
      // const result = await database.execute(query);
      // return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function create(categoria) {
    try {
      return await Categoria.create(categoria);
      //   console.log(nome)
      // const query = 
      // `SELECT * FROM TB_Categoria WHERE nome = '${nome}'`;
      // const result = await database.execute(query);
      // return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  module.exports = {
    getByName,
    getAll,
    create
  }