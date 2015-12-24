// import the necessary modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create  the suite model
var testSuiteSchema = new Schema({
    suiteName: {type: String, required: true},
    suiteDescription: {type: String, required: true},
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    tests: [{
        testName: {type: String, required: true},
        testDescription: {type: String, required: true},
        automated: Boolean,
        preConditions: {type: String, required: true},
        steps: [{
            stepNumber: Number,
            stepDescription: {type: String, required: true},
            expectedResult: {type: String, required: true}
        }]
    }]
});
var testSuite = mongoose.model('Suite', testSuiteSchema);

module.exports = testSuite;
