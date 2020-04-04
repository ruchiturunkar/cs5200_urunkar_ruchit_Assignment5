
function dbConfig()  {
    const mongoose = require("mongoose");
    mongoose.connect('mongodb://localhost:27017/white-board2',
                     {useNewUrlParser: true, useUnifiedTopology: true})
}

module.exports = {
    dbConfig
}