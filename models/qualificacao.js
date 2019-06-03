const mongoose = require('mongoose');
const userSchema = require('./user');

// const acaoQualificacaoSchema = mongoose.Schema({
//     user: userSchema,
//     acao: {
//         type: Number,
//         default: 0
//     },        
//     dataAcao: {
//         type: Date,
//         default: Date.now()
//     }
// });
const qualificacaoSchema = mongoose.Schema({
    acoes: [{
        user: String,
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

//module.exports = mongoose.model('qualificacao', qualificacaoSchema);

module.exports = qualificacaoSchema;