const express = require('express')
const router = express.Router();

const criarCtrl = require("../controllers/authcontroller")
const loginCtrl = require("../controllers/loginController")

router.post('/registrar',criarCtrl)
router.post('/login',loginCtrl);

module.exports = router;