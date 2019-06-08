const express = require('express');

const usuario = require('../models/user');

const jwt = require('jsonwebtoken');

const authConfig = require('../config/config');

const authmiddleware = require('../middlewares/auth');


const router = express.Router();


// Gerador Token
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: '24h',
    });
}

// Inserção de Usuario
router.post('/login', async (req, res) => {
    try {

        // Verifica se o body esta vazio    
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({
                error: 'Body vazio!'
            });
        }

        // Verificar se o email ja existe
        const {
            email
        } = req.body;
        if (await usuario.findOne({
                email
            })) {
            return res.send({
                token: generateToken({
                    email: email
                }),
            });
        } else {
            console.log("entrou")
            // Inserir o Usuario e Retorna Token passando como parametro o ID
            const user = await usuario.create(req.body);
            return res.send({
                token: generateToken({
                    email: user.email
                }),

            });
        }
    } catch (err) {
        console.error(err)
        return res.status(400).send({
            error: 'Registration failed'
        });
    }
});

// Chamada do verificador do Token
router.use(authmiddleware);

// Atualizando usuario no sitema
router.post('/update', async (req, res) => {

    // const {
    //     is_first_login,
    //     gender,
    //     birthday
    // } = req.body;

    try {


        const query = {
            email: req.userId
        };

        console.log(req.userId)

        const update = {
            name: req.body.name,
            is_first_login: req.body.is_first_login,
            gender: req.body.gender,
            birthday: req.body.birthday,
        }

        console.log(req.body.email)

        usuario.findOneAndUpdate({
            email: req.body.email
        }, update, function (err, updated) {
            if (err) {
                return res.status(500).send(err);
            } else {
                return res.json({
                    user: updated
                });
            }
        });
    } catch (err) {
        console.error(err)
        res.status(400).send({
            error: 'Update not Performed'
        })
    }

});

// Atenticando usuario no sistema


router.post('/authenticate', async (req, res) => {
    const {
        email
    } = req.body;

    const user = await usuario.findOne({
        email
    });

    if (!user) {
        return res.status(400).send({
            error: 'Usuario not found'
        });
    }

    res.send({
        user,
    });

});

module.exports = app => app.use('/auth', router);