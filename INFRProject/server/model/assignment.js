//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

let assignmentModel = mongoose.Schema({
    Name: String,
    Teacher: String,
    Subject: String,
    Description: String,
    Due: String
},
{
    collection:"Bio_assignments"
});
module.exports =mongoose.model('Assignment',assignmentModel);
