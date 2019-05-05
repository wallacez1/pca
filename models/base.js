const mongoose = require('mongoose')
const options = {
    discriminatorKey: 'tipoProduto'
}

const baseSchema = mongoose.Schema({

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        default: "Anônimo",
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
    }

}, options);



module.exports = mongoose.model('Base', baseSchema)