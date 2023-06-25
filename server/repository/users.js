const database = require('../database/conection');

async function getAll() {
    try {
      const query = "SELECT * FROM TB_User";
      const result = await database.execute(query);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getById(id) {
    try {
      const query = `SELECT * FROM TB_User WHERE id = ${id}`;
      const result = await database.execute(query);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getByEmail(email) {
    try {
      const query = `SELECT TOP 1 * FROM TB_User WHERE email = '${email}'`;
      const result = await database.execute(query);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function create(user) {
    try {
      const query = `INSERT INTO TB_User VALUES('${user.nome}', '${user.email}', '${user.senha}', '${user.cpf}', ${user.adm});`;
      await database.execute(query);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  module.exports = {
    getAll,
    getById,
    getByEmail,
    create
  }