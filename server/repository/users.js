const database = require('../database/conection');

async function getAll() {
    try {
      const query = "SELECT * FROM TB_User";
      const result = await database.execute(query);
      return result
    } catch (error) {
      console.log(error)
    }
  }

  module.exports = {
    getAll,
  }