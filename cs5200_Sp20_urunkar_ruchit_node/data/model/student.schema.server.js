const mongoose = require("mongoose");
const studentSchema = mongoose.Schema({
                                          _id : Number,
                                          firstName : String,
                                          lastName : String,
                                          username : String,
                                          password: String,
                                          gradYear: Number,
                                          scholarship : Number
                                      }, {collection : "students"});
module.exports = studentSchema;