const mongoose = require('mongoose')

const usuarioSchema = mongoose.Schema({
    nome: {type:String},
    idade: {type:Number},
    username: {type: String},
    sexo: {type: String, enum: ["M","F"]}, 
    email: {type:String},
    senha: {type:String},
    telefone: {type:String},
    dataCadastro: {type: Date, default: DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss.fff")}
});

module.exports =  mongoose.model('usuario',usuarioSchema)