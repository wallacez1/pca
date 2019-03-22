const express = require('express')
const router = express.Router();

const loginCtrl = require("../controllers/login")

router.post('/registrar',loginCtrl.criarUsuario);

module.exports = router;