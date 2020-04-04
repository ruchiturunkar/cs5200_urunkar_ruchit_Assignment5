const mongoose = require('mongoose')
const questionSchema = require('./question.schema.server')
const quizSchema = mongoose.Schema({
             questions: [{
             type: mongoose.Schema.Types.ObjectId,
             ref: 'QuestionModel'
             }]
        }, {collection: 'quizzes'})

