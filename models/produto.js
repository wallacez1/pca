const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const locationSchema = require('./location')

const ProductSchema = new Schema({}, {
    loc: {
        type: locationSchema,
        required: true
    }
});

ProductSchema.index({
    'produtos.loc': '2dsphere'
})
module.exports = mongoose.model('produtos', ProductSchema, 'produtos')