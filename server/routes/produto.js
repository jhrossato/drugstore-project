const express = require('express')
const router = express.Router()
const produtoController = require('../controller/produto')
const authController = require('../controller/authentication')


router.get('/', authController.verifyToken, produtoController.get);
router.get('/:key([a-z]+)', produtoController.getByCategoriaName);
router.get('/:key([0-9]+)', produtoController.getById);
router.post('/new', /*authController.verifyToken,*/ produtoController.post);

module.exports = router;