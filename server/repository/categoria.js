const database = require('../database/conection');

async function getByName(nome) {
    try {
        console.log(nome)
      const query = 
      `SELECT * FROM TB_Categoria WHERE nome = '${nome}'`;
      const result = await database.execute(query);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  
  module.exports = {
    getByName
  }