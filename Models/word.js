const mongoose = require('mongoose');
const random = require('mongoose-random');

const Schema = mongoose.Schema;

const wordSchema = new Schema({
    name: {
        type: String,
        required: true},
    meanings:[
            {type: String, required: true}
    ]
}).plugin(random, {path: 'r'});

module.exports = mongoose.model('Word', wordSchema);