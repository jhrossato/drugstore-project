const Produto = require('../models/produto');
const Categoria = require('../models/categoria');

async function getAll() {
    try {
      return await Produto.findAll({
        include: {
          model: Categoria,
          as: 'categoria'
        }
      });
      // const query = 
      // "SELECT p.id, p.nome, c.nome as categoria, p.marca, p.fabricante, p.sobre, p.preco, p.estoque, p.img "+
      // "FROM TB_Produto p "+
      // "INNER JOIN TB_Categoria c ON p.categoria = c.id";
      // const result = await database.execute(query);
      // return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getByCategoriaId(id) {
    try {
      return await Produto.findAll({
        where: {categoriaId: id}
      });
      // const query = 
      // "SELECT p.id, p.nome, c.nome as categoria, p.marca, p.fabricante, p.sobre, p.preco, p.estoque, p.img "+
      // "FROM TB_Produto p "+
      // "INNER JOIN TB_Categoria c ON p.categoria = c.id " +
      // `WHERE c.id = ${id}`
      // const result = await database.execute(query);
      // return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getById(id) {
    try {
      return await Produto.findByPk(id).then((p) => {
        return p;
      });
      // const query = 
      // `SELECT * FROM TB_Produto p WHERE p.id = ${id}`
      // const result = await database.execute(query);
      // return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function create(produto) {
    try {
      return await Produto.create(produto).then((p) => {
        return p;
      });
      // const query = `INSERT INTO TB_Produto VALUES('${produto.nome}', ${produto.categoriaId}, '${produto.marca}', '${produto.fabricante}', '${produto.sobre}', ${produto.preco}, ${produto.estoque}, '${produto.img}');`;
      // await database.execute(query);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function update(produto) {
    try {
      await Produto.update(produto, {
        where:{
          id: produto.id
        }
      });
      // const query = `UPDATE TB_Produto SET nome = '${produto.nome}', categoria = ${produto.categoriaId}, marca = '${produto.marca}', fabricante = '${produto.fabricante}', sobre = '${produto.sobre}', preco = ${produto.preco}, estoque = ${produto.estoque}, img = '${produto.img}' 
      //   WHERE id = ${produto.id};`;
      // await database.execute(query);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function deleteProduto(produtoId) {
    try {
      await Produto.destroy({
        where: {id: produtoId}
      });
      //console.log(produtoId)
      // const query = `DELETE FROM TB_Produto WHERE id = ${produtoId}`;
      // await database.execute(query);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  module.exports = {
    getAll,
    getByCategoriaId,
    getById,
    create,
    update,
    deleteProduto
  }