const mongoose = require('mongoose');
const multipleChoiceSchema = require('./multiple-choice.schema.server')
const multipleChoiceModel = mongoose.model("MultipleChoiceModel", multipleChoiceSchema)

module.exports = multipleChoiceModel