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

async function getAndCountAll(req, res) {
  try {
    console.log('getAndCountAll');
    const {page, size} = req.query;
    const produtos = await repository.getAndCountAll(page, size);
    produtos != null ? res.status(200).json(produtos) : res.status(204).json(produtos)
  } catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message)
  }
}

async function getByCategoriaName(req, res) {
    try {
      console.log('CHEGOU GET BY NAME')
        const categoriaName = req.params.categoria;
        const categoria = (await categoriaRepository.getByName(categoriaName));
        console.log('categoria '+ categoria)
        const produtos = await repository.getByCategoriaId(categoria.id);
        produtos != null ? res.status(200).json(produtos) : res.status(204).json(produtos)
    } catch (error) {
        res.status(500).send('Internal Server Error: ' + error.message)
    }
  }

  async function getById(req, res) {
    try {
        console.log('CHEGOU GET BY ID')
        const produtoId = req.params.id;
        const produto = (await repository.getById(produtoId));
        produto != null && produto.length != 0 ? res.status(200).json(produto) : res.status(404).json(produto)
    } catch (error) {
        res.status(500).send('Internal Server Error: ' + error.message)
    }
  }

async function post(req, res) {
  try {
    const produto = req.body;
    const result = await repository.create(produto);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message)
  }
}

async function put(req, res) {
  try {
    const produto = req.body;
    await repository.update(produto);
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message)
  }
}

async function deleteProduto(req, res) {
  try {
    const produtoId = req.params.id;
    await repository.deleteProduto(produtoId);
    res.status(200).json({result:"ok"});
  } catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message)
  }
}

module.exports = {
  get,
  getByCategoriaName,
  getById,
  post,
  put,
  deleteProduto,
  getAndCountAll
}