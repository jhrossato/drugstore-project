const express = require('express')
const router = express.Router();
const produtoController = require('../controller/produto');
const authController = require('../controller/authentication');

router.get('/', produtoController.get);
router.get('/paginate', produtoController.getAndCountAll);
router.get('/:categoria([a-z]+)', produtoController.getByCategoriaName);
router.get('/:id', produtoController.getById);
router.post('/', authController.verifyToken, produtoController.post);
router.put('/', authController.verifyToken, produtoController.put);
router.delete('/:id', authController.verifyToken, produtoController.deleteProduto);

module.exports = router;