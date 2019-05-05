const express = require('express');

const User = require('../models/User');

const jwt = require('jsonwebtoken');

const authConfig = require('../config/config');

const authMiddleware = require('../middlewares/auth');


const router = express.Router();


// Gerador Token
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 600,
    });
}

// Inserção de Usuario
router.post('/login', async (req, res) => {
    try{

    // Verificar se o email ja existe
    const { email } = req.body;
    if(await User.findOne({ email })){
        console.log("entrou");
        return res.send({ 
            token: generateToken({ email: email }), 
        });
    } else {
        console.log("entrou")
        // Inserir o Usuario e Retorna Token passando como parametro o ID
        const user = await User.create(req.body);
            return res.send({ 
                token: generateToken({ email: user.email }), 
        
            });
        }
    }catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

// Chamada do verificador do Token
router.use(authMiddleware);

// Atualizando usuario no sitema
router.post('/update', async (req, res) => {
    
    const { is_first_login, gender, birthday } = req.body;

    try {

        const email  = req.userId;

        const user = await User.findOne({ email });

        if(!user)
        return res.status(400).send({ error: 'Usuario nao found' });

        user.is_first_login = is_first_login;
        user.gender = gender;
        user.birthday = birthday;
    
        await user.save();
    
        res.send();
        
    } catch (err) {
        res.status(400).send({ error: "Não Foi" })
    }

});

// Atenticando usuario no sistema

router.post('/authenticate', async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if(!user)
    return res.status(400).send({ error: 'Usuario nao found' });


    res.send({ 
        user,
    });

});

module.exports = app => app.use('/auth', router);