// import the necessary modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create  the run model

    // define schema
    var runSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        author: {
           type: {
               firstName: String,
               lastName: String
           },
            required: true
        },
        previousRunId: mongoose.Schema.Types.ObjectId,
        dateStart: {type: Date, required: true},
        dateEnd: {type: Date, required: true},
        build: Number,
        envShort: String,
        envFull: {},
        status: {
            type: String,
            enum: ['passed', 'executing', 'failed', 'none'],
            default: 'none'
        },
        tests: [mongoose.Schema.Types.ObjectId]
    });
    var run = mongoose.model('Run',runSchema);
module.exports = run;
