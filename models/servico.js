const mongoose = require('mongoose')
const locationSchema = require('./location')

const servicoSchema = mongoose.Schema({
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
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number],

        },

    },
    adress: {
        type: locationSchema,
        required: true
    }
});

servicoSchema.index({
    nomeProduto: 'text'
})

servicoSchema.index({
    loc: '2dsphere'
})




module.exports = mongoose.model('servico', servicoSchema, 'produtos')