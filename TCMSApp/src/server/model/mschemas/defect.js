//import the necessary modules
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

//create  the defect model
//define schema
var defectSchema = new Schema({
    name: {type: String, required: true, unique: true},
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dateOfDefectCreation: Date,
    priority: {
        type: String,
        required: true,
        enum: ['Critical', 'Low', 'High', 'Normal']
    },
    description: {type: String, required: true},
    stepsToReproduce: String,
    run: {type: mongoose.Schema.Types.ObjectId},
    status: {
        type: String,
        required: true,
        enum: ['notFix', 'open', 'inProgress', 'closed']
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});
defectSchema.plugin(uniqueValidator, {message: 'Error, expected {PATH} to be unique.'});
var defect = mongoose.model('Defect', defectSchema);
module.exports = defect;
