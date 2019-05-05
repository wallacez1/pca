const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
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
        uppercase:true, 
        enum: ["M","F"]
    },
    birthday: {
        type: String,

    },
    created_at: {
        type: Date, 
        default: Date.now()
    },
    is_first_login: {
        type: String,
        lowercase: true,
        default: true
    },
    deleted_at: {

    },
    deleted: {

    }

});

module.exports =  mongoose.model('User', UserSchema);

