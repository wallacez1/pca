const mongoose = require('mongoose')
const locationSchema = require('./location')

const servicoSchema = mongoose.Schema({
    emailUsuario: {
        type: String,
        default: "wallace_z1@hotmail.com",
        required: true
    },
    nomeServico: {
        type: String,
        default: "",
        required: true
    },

    loc: locationSchema,

    tipoProduto: {
        type: String,
        default: "se",
        required: true
    },
    valorServico: {
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
    nomeEstabelecimento: {
        type: String,
        default: 0
    },
    Descricao: {
        type: String,
        default: 0
    },
});

module.exports = mongoose.model('servico', servicoSchema, 'produtos')