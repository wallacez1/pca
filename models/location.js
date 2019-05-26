const mongoose = require('mongoose')

const locationSchema = mongoose.Schema({


    rua: {
        type: String,
        lowercase: true
    },
    numero: {
        type: String,
        lowercase: true
    },
    cidade: {
        type: String,
        lowercase: true
    },
    estado: {
        type: String,
        lowercase: true
    },
    pais: {
        type: String,
        lowercase: true
    },


});



module.exports = locationSchema;