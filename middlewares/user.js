const userModel = require('../models/user');

/**
 * Consulta o produto de uma query
 */
module.exports = (req, res, next) => {

    if (!req.userEmail) {
        return res.status(500).json({message: 'Sem email na requisição'});
    } 
    userModel.findOne({email: req.userEmail}, (err, user) => {
        if (err) {
            return res.status(500).json({message: "Usuário não encontrado: " + err});
        }
        
        req.user = user;
        next();
    });
};