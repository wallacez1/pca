const mongoose = require('mongoose');

const qualificacaoSchema = new mongoose.Schema({
    acoes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            require: true
        },
        acao: {
            type: Number,
            default: 0
        },        
        dataAcao: {
            type: Date,
            default: Date.now()
        }
    }]
});

module.exports = mongoose.model('qualificacoes', qualificacaoSchema);