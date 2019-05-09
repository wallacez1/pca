const mongoose = require('mongoose')
const Base = require('./base')


const prodFisicoSchema = mongoose.Schema({
    emailUsuario: {
        type: String,
        default: "",
        required: true
    },
    nomeProduto: {
        type: String,
        default: "",
        required: true
    },
    tipoProduto: {
        type: String,
        default: "",
        required: true
    },
    valorProduto: {
        type: Number,
        default: 0,
        required: true
    },
    dataCadastro: {
        type: Date,
        default: Date.now(),
        required: true
    },
    totalLikes: {
        type: Number,
        default: 0
    },
    totalDeslikes: {
        type: Number,
        default: 0
    },
    imagePath: {
        type: String,
        required: true
    },
    nomeEstabelecimento: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('produtoFisico', prodFisicoSchema, 'produtos')