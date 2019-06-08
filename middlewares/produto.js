const produtoModel = require('../models/produto');

/**
 * Consulta o produto de uma query
 */
module.exports = (req, res, next) => {

    let {produto} = req.query;

    if (!produto) {
        return res.status(400).json({message: "Id do produto não informado"});
    }

    produtoModel.findById(produto, (err, produtoData) => {
        if (err) {                
            return res.status(500).json({message: "Produto não encontrado: " + err});
        }
    
        req.produto = produtoData.toObject();
        next();
    });
};