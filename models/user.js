const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
    },
    uid: {
        type: String,
    },
    gender: {
        type: String,
        uppercase: true,
        enum: ["M", "F", "O"]
    },
    birthday: {
        type: Date,

    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    is_first_login: {
        type: Boolean,
        lowercase: true,
        default: true
    },
    deleted_at: {

    },
    deleted: {
        type: Boolean,
        default: false
    }

});

const collection = 'user';
module.exports = mongoose.model(collection, userSchema);

