const mongoose = require('mongoose');

const wordSchema = mongoose.Schema({
    word: {
        type: String,
        required: [true, "Add a word!!! This is a word database!!!"]
    },
    sentence: {
        type: String,
        required: [false, "Add a sentence or not, I don't care"]
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Word', wordSchema)