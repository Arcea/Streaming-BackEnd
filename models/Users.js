const mongoose = require('../config/db');

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        minlength: 1
    },
    Age: {
        type: Number,
        required: true,
        minLength: 1
    },
    Transparant: {
        type: Boolean,
        required: true,
        minlength: 1
    },
    PublicKey: {
        type: String,
        required: true,
        minLength: 1
    },

    TransparentUser: {
        type: Boolean,
        required: true
    },

    Slogan: {
        type: String,
        required: false
    }
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;