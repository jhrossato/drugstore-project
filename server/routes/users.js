const express = require('express')
const router = express.Router()
const usersController = require('../controller/users')
const authController = require('../controller/authentication')
const validate = require('../validation/user')

router.get('/', authController.verifyToken, usersController.get);
router.post('/new', validate, usersController.post);

module.exports = router;