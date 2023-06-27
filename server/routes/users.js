const express = require('express')
const router = express.Router()
const usersController = require('../controller/users')
const carrinhoController = require('../controller/carrinho')
const authController = require('../controller/authentication')
const validate = require('../validation/user')

router.get('/', authController.verifyToken, usersController.get);
router.get('/:id', authController.verifyToken, usersController.getById);
router.get('/carrinho', authController.verifyToken, carrinhoController.get);
router.post('/carrinho', authController.verifyToken, carrinhoController.post);
router.post('/new', validate, usersController.post);
router.put('/update/:id', authController.verifyToken, validate, usersController.put);
router.delete('/delete/:id', authController.verifyToken, usersController.deleteUser);

module.exports = router;