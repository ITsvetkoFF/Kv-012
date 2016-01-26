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
        dateEnd: {type: Date},
        build: Number,
        envShort: String,
        envFull: {},
        status: {
            type: String,
            validate: {
                validator: function (v) {
                    return /passed|executing|failed/.test(v);
                },
                message: '{VALUE} is not valid status!'
            },
            default: 'executing'
        },
        //the
        tests: [{
            name: {type: String, required: true},
            testDescription: {type: String},
            automated: Boolean,
            preConditions: {type: String},
            suite: String,
            steps: [{
                number: Number,
                action: {type: String, required: true},
                expected: {type: String, required: true},

                status: {
                    type: String,
                    enum:['passed','blocked', 'failed']
                }
            }],
            status: {
                type: String,
                enum:['passed','blocked', 'failed']
            }
        }]
    });
var run = mongoose.model('Run',runSchema);
module.exports = run;
