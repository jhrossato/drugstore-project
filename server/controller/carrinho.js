const repository = require('../repository/carrinho')

async function get(req, res) {
  try {
    const userId = req.userId;
    const itens = await repository.getItensByUserId(userId);
    itens != null && itens.length > 0 ? res.status(200).json(itens) : res.status(204).json(itens)
  } catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message)
  }
}

async function post(req, res) {
  try {
    const userId = req.userId;
    const produtoId = req.body.produtoId;
    const quantidade = req.body.quantidade;
    const exists = (await repository.verifyIfExists(userId, produtoId));
    if(exists){
        await repository.updateQuantidade(userId, exists.id_produto, exists.quantidade, quantidade)
        res.status(200).end();
    }
    else{
        await repository.insertItensByUserId(userId, produtoId, quantidade);
        res.status(201).end();
    }
  } catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message)
  }
}

module.exports = {
  get,
  post
}