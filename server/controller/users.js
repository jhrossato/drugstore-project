const repository = require('../repository/users')

async function get(req, res) {
  try {
    const users = await repository.getAll();
    users != null ? res.status(200).json(users) : res.status(204).json(users)
  } catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message)
  }
}

async function getById(req, res) {
  try {
    const userId = req.userId;
    const user = (await repository.getById(userId));
    user != null ? res.status(200).json(user) : res.status(204).json(user)
  } catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message)
  }
}

async function put(req, res) {
  try {
    const userId = req.params.id;
    const user = req.body;
    await repository.update(user, userId);
    res.status(200).json({update:"ok"});
  } catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message)
  }
}

async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    await repository.deleteUser(userId);
    res.status(200).end();
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
  getById,
  put,
  deleteUser,
  post
}