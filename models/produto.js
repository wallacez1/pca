const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const locationSchema = require('./location')

const ProductSchema = new Schema( {
    loc: {
        type: locationSchema,
        required: true
    },
    qualificacao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'qualificacoes',
        required: false
    }
});

module.exports = mongoose.model('produtos', ProductSchema, 'produtos')