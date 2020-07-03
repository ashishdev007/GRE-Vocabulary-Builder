const mongoose = require('mongoose');
const random = require('mongoose-random');

const Schema = mongoose.Schema;

const wordSchema = new Schema({
    name: {
        type: String,
        required: true},
    meanings:[
            {type: String, required: true}
    ],
    attempts: {type: Number, default: 0},
    successAttempts: {type: Number, default:0}
}).plugin(random, {path: 'r'});

module.exports = mongoose.model('Word', wordSchema);