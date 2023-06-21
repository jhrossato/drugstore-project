const repository = require('../repository/users')

async function getUsers(req, res) {
  try {
    const users = await repository.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}

module.exports = {
  getUsers,
}