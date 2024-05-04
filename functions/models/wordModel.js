const mongoose = require('mongoose');

const wordSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please add a user_id!"],
        ref: "User"
    },
    word: {
        type: String,
        required: [true, "Add a word! This is a word database!"]
    },
    sentence: {
        type: [String],
        required: [true, "You can leave this blank, but I highly recommend you use it."]
    },
    meaning: {
        type: String,
        required: [true, "Please add a meaning to this word!"]
    },
    lastSeenInContext: {
        type: Date,
        required: [true, "Please add a date when this word was last seen in context!"]
    },
    context: {
        type: [String],
        required: [true, "Please add a context for this word!"]
    },
    lastReviewed: {
        type: Date,
        required: [true, "Please add a date when this word was last reviewed!"]
    },
    nextReview: {
        type: Date,
        required: [true, "Please add a date when this word will be next reviewed!"]
    },
    reviewInterval: {
        type: Number,
        required: [true, "Please add a review interval for this word!"]
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Word', wordSchema)