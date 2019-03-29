const express = require('express')
const router = express.Router();

const criarCtrl = require("../controllers/criarUsuario")
const loginCtrl = require("../controllers/login")

router.post('/registrar',criarCtrl.criarUsuario)
router.post('/login',loginCtrl.login);

module.exports = router;