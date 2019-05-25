const express = require('express');
const authmiddleware = require('../middlewares/auth');
const usuario = require('../models/user');


const router = express.Router();

// Chamada do verificador do Token
router.use(authmiddleware);


// Enviando Requisição
router.get('/me', async(req, res) => {
  // res.send({ ok:false, user: req.userId })
    
    const email  = req.userEmail;
    
    const user = await usuario.findOne({ email });
    
    if(!user){
      return res.status(400).send({ error: 'Usuario not found' });
    }

    res.send({ 
        user,
    });
    
});

module.exports = app => app.use('/auth', router);