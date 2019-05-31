const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const locationSchema = require('./location')
const mongoosePaginate = require('mongoose-paginate');

const ProductSchema = new Schema({}, {
    loc: {
        type: locationSchema,
        required: true
    }
});

ProductSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('produtos', ProductSchema, 'produtos')