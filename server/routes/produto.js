const express = require('express')
const router = express.Router()
const produtoController = require('../controller/produto')
const authController = require('../controller/authentication')


router.get('/', produtoController.get);
router.get('/nome/:key', produtoController.getByCategoriaName);
router.get('/:id', produtoController.getById);
router.post('/new', authController.verifyToken, produtoController.post);
router.put('/edit', authController.verifyToken, produtoController.put);
router.delete('/delete/:id', authController.verifyToken, produtoController.deleteProduto);

module.exports = router;