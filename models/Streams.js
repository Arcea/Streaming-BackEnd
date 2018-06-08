const mongoose = require('../config/db');

const Schema = mongoose.Schema;
const streamSchema = new Schema({
    Date: {
        type: Date,
        required: true,
        minLength: 1
    },
    Length: {
        type: Date,
        required: true,
        minLength: 1
    },
    Viewers: {
        type: Number,
        required: true,
        minLength: 1
    }
});

const Streams = mongoose.model('Streams', streamSchema);

module.exports = {
    Streams
};