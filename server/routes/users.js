const express = require('express')
const router = express.Router()
const usersController = require('../controller/users')
const carrinhoController = require('../controller/carrinho')
const authController = require('../controller/authentication')
const validate = require('../validation/user')

router.get('/', authController.verifyToken, usersController.get);
router.get('/carrinho', authController.verifyToken, carrinhoController.get);
router.post('/carrinho', authController.verifyToken, carrinhoController.post);
router.post('/new', validate, usersController.post);

module.exports = router;