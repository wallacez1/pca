const mongoose = require('mongoose')
const locationSchema = require('./location')


const prodFisicoSchema = mongoose.Schema({
    emailUsuario: {
        type: String,
        default: "wallacez1@hotmail.com",
        required: true
    },
    nomeProduto: {
        type: String,
        default: "",
        required: true
    },
    loc: locationSchema,
    isOnline: {
        type: Boolean,
        default: false,
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