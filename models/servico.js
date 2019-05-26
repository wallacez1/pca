const mongoose = require('mongoose')
const locationSchema = require('./location')

const servicoSchema = mongoose.Schema({
    emailUsuario: {
        type: String,
        default: "",
        required: true,
        lowercase: true
    },
    nomeServico: {
        type: String,
        default: "",
        required: true,
        lowercase: true
    },
    categoria: {
        type: String,
        default: "",
        required: true,
        lowercase: true
    },

    tipoProduto: {
        type: String,
        default: "se",
        required: true,
        lowercase: true
    },
    valorServico: {
        type: Number,
        default: 0,
        required: true,

    },
    dataCadastro: {
        type: Date,
        default: Date.now(),
        required: true,

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
    descricao: {
        type: String,
        default: "",
        lowercase: true
    },
    loc: {
        type: locationSchema,
        required: true
    }
});

servicoSchema.index({
    'produtos.loc': '2dsphere'
})

module.exports = mongoose.model('servico', servicoSchema, 'produtos')