const mongoose = require('../config/db');

const Schema = mongoose.Schema;
const tokenSchema = new Schema({
    Token: {
        type: String,
        required: true,
        minlength: 1
    },
    ExpirationDate: { 
        type: Date,
        required: true,
        minlength: 1
    }
});

const Tokens = mongoose.model('Tokens', tokenSchema);

module.exports = {
    Tokens
};