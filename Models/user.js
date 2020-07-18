const mongoose = require('mongoose');
const path = require('path');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    imageUrl: {type: String, default: path.join(__dirname, "..",  "Images", "dummy.jpg") }
});

module.exports = mongoose.model('User', userSchema);