const { Schema, default: mongoose } = require("mongoose");

const optionSchema = new Schema({
    key: {
        type: Number,
        required: true
    },
    option: {
        type: String,
        required: true
    }
});

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answers: [optionSchema],

    answer: {
        type: Number,
        required: true
    },
    difficulty: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['multi', 'single']
    }

}, {
    timestamps: true
});
const quizSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },

    instructions: {
        type: String,
        required: true
    },
    questions: [questionSchema],

}, {
    timestamps: true
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;