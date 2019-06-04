const mongoose = require('mongoose')



const produtoOnlineSchema = mongoose.Schema({
    emailUsuario: {
        type: String,
        ref: 'usuario',
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
    tipoProduto: {
        type: String,
        default: "po",
        required: true,
        lowercase: true
    },
    categoria: {
        type: String,
        default: "",
        required: true,
        lowercase: true

    },
    isOnline: {
        type: Boolean,
        default: true,
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
    },

});


produtoOnlineSchema.index({
    nomeProduto: 'text'
})

module.exports = mongoose.model('produtoOnline', produtoOnlineSchema, 'produtos')