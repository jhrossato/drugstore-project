const repository = require('../repository/users')

async function get(req, res) {
  try {
    const users = await repository.getAll();
    users != null ? res.status(200).json(users) : res.status(204).json(users)
  } catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message)
  }
}

async function post(req, res) {
  try {
    const user = req.body;
    await repository.create(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message)
  }
}

module.exports = {
  get,
  post
}