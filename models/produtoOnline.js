const mongoose = require('mongoose')


const produtoOnlineSchema = mongoose.Schema({
    emailUsuario: {
        type: String,
        ref: 'usuario',
        default: "wallace.silva@unigranrio.br",
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
    url: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('produtoOnline', produtoOnlineSchema, 'produtos')