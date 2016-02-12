// import the necessary modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var suiteStepSchema = mongoose.Schema({
    stepDescription: {
        type: String,
        required: true
    },
    expectedResult: {type: String, required: true}
});

var runStepSchema = mongoose.Schema({
    stepDescription: {type: String, required: true},
    expectedResult: {type: String, required: true},
    status: {
        type: String,
        enum:['passed','blocked', 'failed', 'pending']
    }
});

// define test case schema
var suiteTestSchema = new Schema({
    testName: {type: String, required: true},
    testDescription: {type: String, default: 'No description.'},
    automated: {type: Boolean},
    preConditions: {type: String, required: true},
    suite: {type: mongoose.Schema.Types.ObjectId, required: true},
    created: {type: Date, default: Date.now},
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        default: 'Low'
    },
    steps: [suiteStepSchema]
});

var runTestSchema = new Schema({
    testName: {type: String, required: true},
    testDescription: {type: String},
    automated: {type: Boolean},
    preConditions: {type: String, required: true},
    run: {type: mongoose.Schema.Types.ObjectId, required: true},
    suite: {type: String, required: true},
    created: {type: Date, default: Date.now},
    status: {
        type: String,
        enum:['passed','blocked', 'failed', 'pending']
    },
    steps: [runStepSchema]
});

var suiteTest = mongoose.model('SuiteTests', suiteTestSchema);
var runTest = mongoose.model('RunTests', runTestSchema);

module.exports = {
    suiteTestSchema: suiteTestSchema,
    runTestSchema: runTestSchema,
    suiteTest: suiteTest,
    runTest: runTest
};
