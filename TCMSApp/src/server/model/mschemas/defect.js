//import the necessary modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create  the defect model
//define schema
var defectSchema = new Schema({
        randomId: Number,
        name: {type: String, required: true, unique: true},
        whoFind: String,
        assignedTo: String,
        dateOfDefectCreation: Date,
        priority: {
            type: String,
            required: true,
            enum: ['critical', 'low', 'high', 'normal']
        },
        description: {type: String, required: true},
        stepsToReproduce: [String],
        testRunId: Number
    });
var defect = mongoose.model('Defect', defectSchema) ;
module.exports = defect;
