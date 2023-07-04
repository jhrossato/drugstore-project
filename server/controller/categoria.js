const repository = require('../repository/categoria')

async function get(req, res) {
  try {
    const categorias = await repository.getAll();
    categorias != null ? res.status(200).json(categorias) : res.status(204).json(categorias)
  } catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message)
  }
}

async function post(req, res) {
  try {
    categoria = req.body;
    console.log(categoria)
    await repository.create(categoria);
    res.status(201).json({result: "ok"});
  } catch (error) {
    res.status(400).json({"error": error.message})
  }
}

module.exports = {
  get,
  post
}