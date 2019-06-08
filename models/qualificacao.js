const mongoose = require('mongoose');
const userSchema = require('./user').schema;

const qualificacaoSchema = mongoose.Schema({
    acoes: [{
        user: userSchema,
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

module.exports.model = mongoose.model('qualificacao', qualificacaoSchema);

module.exports = qualificacaoSchema;