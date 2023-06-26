const database = require('../database/conection');

async function getItensByUserId(id) {
    try {
      const query = 
        `SELECT u.id as userId, p.id as produtoId, p.nome, p.preco, c.quantidade FROM TB_Carrinho c
        INNER JOIN TB_Produto p ON c.id_produto = p.id
        INNER JOIN TB_User u ON u.id = c.id_user
        WHERE u.id = ${id}`;
      const result = await database.execute(query);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function insertItensByUserId(userId, produtoId, quantidade) {
    try {
      const query = `INSERT INTO TB_Carrinho VALUES (${userId}, ${produtoId}, ${quantidade})`;
      await database.execute(query);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function verifyIfExists(userId, produtoId) {
    try {
      const query = `SELECT * FROM TB_Carrinho WHERE id_user = ${userId} and id_produto = ${produtoId}`;
      const result = await database.execute(query);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function updateQuantidade(userId, produtoId, quantidade, quantidadeAdicional) {
    try {
        const totalQtd = parseInt(quantidade) + parseInt(quantidadeAdicional);
        const query = `UPDATE TB_Carrinho SET quantidade = ${totalQtd} WHERE id_user = ${userId} and id_produto = ${produtoId}`;
        const result = await database.execute(query);
        return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  module.exports = {
    getItensByUserId,
    insertItensByUserId,
    verifyIfExists,
    updateQuantidade
  }