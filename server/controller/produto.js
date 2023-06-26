const repository = require('../repository/produto')
const categoriaRepository = require('../repository/categoria')

async function get(req, res) {
  try {
    const produtos = await repository.getAll();
    produtos != null ? res.status(200).json(produtos) : res.status(204).json(produtos)
  } catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message)
  }
}

async function getByCategoriaName(req, res) {
    try {
        const categoriaName = req.params.key;
        const categoria = (await categoriaRepository.getByName(categoriaName)).shift();
        const produtos = await repository.getByCategoriaId(categoria.id);
        produtos != null ? res.status(200).json(produtos) : res.status(204).json(produtos)
    } catch (error) {
        res.status(500).send('Internal Server Error: ' + error.message)
    }
  }

  async function getById(req, res) {
    try {
        const produtoId = req.params.key;
        const produto = await repository.getById(produtoId);
        produto != null && produto.length != 0 ? res.status(200).json(produto) : res.status(404).json(produto)
    } catch (error) {
        res.status(500).send('Internal Server Error: ' + error.message)
    }
  }

async function post(req, res) {
  try {
    const produto = req.body;
    await repository.create(produto);
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message)
  }
}

module.exports = {
  get,
  getByCategoriaName,
  getById,
  post
}