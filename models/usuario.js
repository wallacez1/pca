const mongoose = require('mongoose')

const usuarioSchema = mongoose.Schema({
    nome: {type:String,lowercase:true},
    idade: {type:Number},
    usuario: {type: String},
    sexo: {type: String, lowercase:true, enum: ["M","F"]}, 
    email: {type:String, lowercase:true},
    senha: {type:String,},
    telefone: {type:Number},
    dataCadastro: {type: Date, default: Date.now()}
})

module.exports =  mongoose.model('usuario',usuarioSchema)