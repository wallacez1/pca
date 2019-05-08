const jwt = require('jsonwebtoken');
const authConfig = require('../config/config');
const usuario = require('../models/user');


// Verifição se o Token e valido ou não


module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({ error: 'Token não informado' });

    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).send({ error: 'Token error' });

    const [ scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token malformado' })

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token invalido'});

        req.userEmail = decoded.email;
        return next();

    });
    
};