const express = require('express');
const authMiddleware = require('../middlewares/auth');
const User = require('../models/User');


const router = express.Router();

// Chamada do verificador do Token
router.use(authMiddleware);

// Enviando Requisição
router.get('/me', async(req, res) => {
  // res.send({ ok:false, user: req.userId })
    
    const email  = req.userId;
    
    const user = await User.findOne({ email });
    
    if(!user)
    return res.status(400).send({ error: 'Usuario nao found' });


    res.send({ 
        user,
    });
    
});

module.exports = app => app.use('/auth', router);