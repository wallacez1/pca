const mongoose = require('mongoose')

const produtoSchema = mongoose.Schema({
    usuario: {type: mongoose.Schema.Types.ObjectId, ref:'usuario', default:"Anônimo"},
    nome: {type:String, default:""},
    valor: {type:Number,default:0},
    dataCadastro: {type: Date, default: DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss.fff")},
    totalLikes: {type:Number, default:0},

});

module.exports =  mongoose.model('usuario',produtoSchema)