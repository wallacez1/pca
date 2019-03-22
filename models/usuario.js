const mongoose = require('mongoose')

const usuarioSchema = mongoose.Schema({
    username: {type: String},
    email: {type:String},
    senha: {type:String}
});

module.exports =  mongoose.model('usuario',usuarioSchema)