// import the necessary modules
var mongoose = require('mongoose');
var test = require('./test');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var suiteTestSchema = test.suiteTestSchema;

// create  the suite model
var suiteSchema = mongoose.Schema({
    suiteName: {type: String, required: true},
    suiteDescription: {type: String, default: 'No description.'},
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    tests: [suiteTestSchema]
});

suiteSchema.index({project: 1, suiteName: 1}, {unique: true});
suiteSchema.plugin(uniqueValidator);
var testSuite = mongoose.model('Suite', suiteSchema);

module.exports = testSuite;
