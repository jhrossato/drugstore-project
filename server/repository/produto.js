const database = require('../database/conection');

async function getAll() {
    try {
      const query = 
      "SELECT p.id, p.nome, c.nome as categoria, p.marca, p.fabricante, p.sobre, p.preco, p.estoque "+
      "FROM TB_Produto p "+
      "INNER JOIN TB_Categoria c ON p.categoria = c.id";
      const result = await database.execute(query);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getByCategoriaId(id) {
    try {
      const query = 
      "SELECT p.id, p.nome, c.nome as categoria, p.marca, p.fabricante, p.sobre, p.preco, p.estoque "+
      "FROM TB_Produto p "+
      "INNER JOIN TB_Categoria c ON p.categoria = c.id " +
      `WHERE c.id = ${id}`
      const result = await database.execute(query);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getById(id) {
    try {
      const query = 
      `SELECT * FROM TB_Produto p WHERE p.id = ${id}`
      const result = await database.execute(query);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function create(produto) {
    try {
      const query = `INSERT INTO TB_Produto VALUES('${produto.nome}', ${produto.categoriaId}, '${produto.marca}', '${produto.fabricante}', '${produto.sobre}', ${produto.preco}, ${produto.estoque});`;
      await database.execute(query);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  module.exports = {
    getAll,
    getByCategoriaId,
    getById,
    create
  }