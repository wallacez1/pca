const mongoose = require('mongoose')
const Base = require('./base')


const prodFisicoSchema = mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        default: "507f1f77bcf86cd799439011",
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
    estabelecimentoProduto: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('produtoFisico', prodFisicoSchema)