const mongoose = require('../config/db');

const Schema = mongoose.Schema;
const userSchema = new Schema({
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
    PublicKey: {
        type: String,
        required: true,
        minLength: 1
    }
});

const Users = mongoose.model('Users', userSchema);

module.exports = {
    Users
};