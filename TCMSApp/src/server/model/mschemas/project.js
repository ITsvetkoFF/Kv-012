// import the necessary modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create an export function to encapsulate the project model creation
module.exports = function() {
    // define schema
    var projectSchema = new Schema({
        name: {type: String, required: true},
        description: {type: String, required: true},
        users:  [mongoose.Schema.Types.ObjectId],
        suites: [mongoose.Schema.Types.ObjectId],
        dateStart: {type: Date, required: true},
        dateEnd: {type: Date, required: true}
    });
    mongoose.model('Project', projectSchema);
};
