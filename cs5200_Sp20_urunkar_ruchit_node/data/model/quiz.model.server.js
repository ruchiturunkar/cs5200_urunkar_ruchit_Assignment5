const mongoose = require('mongoose')
const quizSchema = require('./quiz.schema.server')
const quizModel = mongoose.model('QuizModel', quizSchema)

module.exports = quizModel