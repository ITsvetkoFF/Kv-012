// import the necessary modules
var mongoose = require('mongoose');
var runTestSchema = require('./test').runTestSchema;
var Schema = mongoose.Schema;

// create  the run model

// define schema
var runSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    previousRunId: mongoose.Schema.Types.ObjectId,
    dateStart: Date,
    dateEnd: {type: Date},
    intervalOfExecution: {
        type: Number,
        default: 0
    },
    build: Number,
    envShort: String,
    envFull: {},
    status: {
        type: String,
        enum: [
            'new',  // created, but not executed yet
            'passed',  // all the steps passed successfully
            'executing',  // run is being executed at the moment
            'failed',  // one or more steps were failed
            'pending'  // last execution was not finished
        ],
        default: 'new'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});
var run = mongoose.model('Run', runSchema);
module.exports = run;
