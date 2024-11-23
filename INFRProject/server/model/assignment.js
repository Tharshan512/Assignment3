//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

let assignmentModel = mongoose.Schema({
    Name: String,
    Teacher: String,
    Subject: String,
    Description: String,
    Due: Number
},
{
    collection:"Bio_assignments"
});
module.exports =mongoose.model('Assignment',assignmentModel);
