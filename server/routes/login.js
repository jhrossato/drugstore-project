const express = require('express')
const router = express.Router()
const authController = require('../controller/authentication')

router.post('/', authController.generateToken);

module.exports = router;