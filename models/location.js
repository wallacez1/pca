const mongoose = require('mongoose')

const locationSchema = mongoose.Schema({

    endereco: {
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
        }
    },
    geo: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number],
            index: "2dsphere"
        }
    }


});



module.exports = locationSchema;