const mongoose = require('mongoose')

const produtoSchema = mongoose.Schema({
    nome: {type:String},
    valor: {type:Number,default:0},
    dataCadastro: {type: Date, default: DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss.fff")}
});

module.exports =  mongoose.model('usuario',produtoSchema)