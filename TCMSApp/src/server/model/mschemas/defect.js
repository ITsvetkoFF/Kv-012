//import the necessary modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create  the defect model
//define schema
var defectSchema = new Schema({
        randomId: Number,
        name: {type: String, required: true},
        whoFind: String,
        assignedTo: String,
        dateOfDefectCreation: Date,
        priority: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return /critical|high|normal|low/i.tests();
                },
                message: '{Value} is not allowed'
            }
        },
        description: {type: String, required: true},
        stepsToReproduce: [String],
        testRunId: Number
    });
var defect = mongoose.model('Defect', defectSchema) ;
module.exports = defect;
