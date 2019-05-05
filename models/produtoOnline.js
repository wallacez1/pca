const mongoose = require('mongoose')


const produtoOnlineSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        default: "507f1f77bcf86cd799439011",
        required: true
    },
    email: {
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
    totalunlikes: {
        type: Number,
        default: 0
    },
    url: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('produtoOnline', produtoOnlineSchema)