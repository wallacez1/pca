const mongoose = require('mongoose')
const locationSchema = require('./location')


const prodFisicoSchema = mongoose.Schema({
    emailUsuario: {
        type: String,
        default: "",
        required: true,
        lowercase: true
    },
    nomeProduto: {
        type: String,
        default: "",
        required: true,
        lowercase: true
    },

    isOnline: {
        type: Boolean,
        default: false,
        required: true,
        lowercase: true
    },
    tipoProduto: {
        type: String,
        default: "pf",
        required: true,
        lowercase: true
    },
    categoria: {
        type: String,
        default: "",
        required: true
    },
    valorProduto: {
        type: Number,
        default: 0,
        required: true,

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
        required: true,
        lowercase: true
    },
    loc: locationSchema,
});

module.exports = mongoose.model('produtoFisico', prodFisicoSchema, 'produtos')