const express = require('express')
const router = express.Router()
const categoriaController = require('../controller/categoria')

router.get('/', categoriaController.get);
router.post('/', categoriaController.post);

module.exports = router;