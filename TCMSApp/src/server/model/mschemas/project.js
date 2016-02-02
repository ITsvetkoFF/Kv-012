// import the necessary modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create  the project model

// define schema
var projectSchema = new Schema({
        name: {type: String, required: true},
        trelloOrganizationId: {type: String},
        description: {type: String},
        admins:  [{type: String, required: true}],
        users:  [mongoose.Schema.Types.ObjectId],
        suites: [mongoose.Schema.Types.ObjectId],
        dateStart: {type: Date, required: true},
        dateEnd: {type: Date, required: true}
    });
var project = mongoose.model('Project', projectSchema);
module.exports = project;
