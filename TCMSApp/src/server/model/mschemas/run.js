// import the necessary modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create an export function to encapsulate the run model creation
module.exports = function() {
    // define schema
    var runSchema = new Schema({
        previousRunId: mongoose.Schema.Types.ObjectId,
        dateStart: {type: Date, required: true},
        dateEnd: {type: Date, required: true},
        build: Number,
        environment: String,
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
            testName: {type: String, required: true},
            testDescription: {type: String, required: true},
            automated: Boolean,
            preConditions: {type: String, required: true},
            steps: [{
                stepNumber: Number,
                stepDescription: {type: String, required: true},
                expectedResult: {type: String, required: true},

                status: {
                    type: String,
                    validate: {
                        validator: function (v) {
                            return /passed, blocked, failed/.test(v);
                        },
                        message: '{VALUE} is not valid status!'
                    }
                }
            }],
            status: {
                type: String,
                validate: {
                    validator: function (v) {
                        return /passed|executing|failed/.test(v);
                    },
                    message: '{VALUE} is not valid status!'
                }
            }
        }]
    });
    var run = new mongoose.model('run',runSchema);
};
