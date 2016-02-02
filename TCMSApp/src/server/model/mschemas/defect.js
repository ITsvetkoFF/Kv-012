//import the necessary modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create  the defect model
//define schema
var defectSchema = new Schema({
        name: {type: String, required: true, unique: true},
        reporter: {type: mongoose.Schema.Types.ObjectId, required: true},
        assignedTo: {type: mongoose.Schema.Types.ObjectId},
        date: Date,
        priority: {
            type: String,
            required: true,
            enum: ['Critical', 'Low', 'High', 'Normal']
        },
        description: {type: String, required: true},
        stepsToReproduce: [String],
        run: {type: mongoose.Schema.Types.ObjectId}
    });
var defect = mongoose.model('Defect', defectSchema) ;
module.exports = defect;
