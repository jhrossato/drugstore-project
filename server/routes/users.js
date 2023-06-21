const express = require('express')
const router = express.Router()
const usersController = require('../controller/users')

router.get('/', usersController.getUsers)

module.exports = router