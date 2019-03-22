const mongoose = require('mongoose')

const usuarioSchema = mongoose.Schema({
    nome: {type:String},
    username: {type: String},
    email: {type:String},
    senha: {type:String},
    telefone: {type:String},
    dataCadastro: {type: Date, default: DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss.fff")}
});

module.exports =  mongoose.model('usuario',usuarioSchema)