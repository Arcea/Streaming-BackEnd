const mongoose = require('../config/db');

const Schema = mongoose.Schema;
const chatSchema = new Schema({
    Content: {
        type: String,
        required: true,
        minlength: 1
    },
    Date: {
        type: Date,
        required: true,
        minLength: 1
    },
    Stream: {
        type: Schema.Types.ObjectId,
        ref: 'Streams',
        required: true,
    }
});

const Chats = mongoose.model('Chats', chatSchema);

module.exports = {
    Chats
};