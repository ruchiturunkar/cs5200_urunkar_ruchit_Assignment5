const mongoose = require('mongoose');
const trueFalseSchema = require('./true-false.schema.server')
const trueFalseModel = mongoose.model("TrueFalseModel", trueFalseSchema)

module.exports = trueFalseModel