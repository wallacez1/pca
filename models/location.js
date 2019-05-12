const mongoose = require('mongoose')

const locationSchema = mongoose.Schema({

    endereco: {
        rua: {
            type: String
        },
        numero: {
            type: String,
        },
        cidade: {
            type: String,
        },
        estado: {
            type: String,
        },
        pais: {
            type: String,
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