const mongoose = require('../config/db');

const Schema = mongoose.Schema;
const actionSchema = new Schema({
    Action: {
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
        ref: 'Users',
        required: true,
    }
});

const Actions = mongoose.model('Actions', actionSchema);

module.exports = {
    Actions
};