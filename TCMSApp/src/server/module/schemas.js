/**
 * Created by Олег on 12/21/2015.
 */
'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    users: Number,
    suites: Number,
    dateStart: {type: Date, required: true},
    dateEnd: {type: Date, required: true}
});
var project = mongoose.model('project', projectSchema);

//****************************************************

var runSchema = new Schema({
    _id: Number,
    previousRunId: Number,
    dateStart:{type: Date, required: true},
    dateEnd: {type: Date, required: true},
    build: Number,
    environment: String,
    status:{
        type: String,
        validate:{
            validator: function (v){
                return /passed|executing|failed/.test(v);
            },
            message: '{VALUE} is not valid status!'
        }
    },
    tests: [{
        id: Number,
        status: {
            type: String,
            validate:{
                validator: function (v){
                    return /passed|executing|failed/.test(v);
                },
                message: '{VALUE} is not valid status!'
            }},
        //!!!!!!!!!!!!!!!!!!!not finished
        steps: {
            type: String,
            validate:{
                validator: function (v){
                    return /passed|executing|failed/.test(v);
                },
                message: '{VALUE} is not valid status!'
            }
        }
    }]
});
var run = new mongoose.model('run',runSchema);

//**********************************************

var userSchema = new Schema({
    _id: {type: Number, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true},
    password: {type: String, required: true},
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            //regular expression from emailregex.com
            validator: function(v) {
                return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(v);
            },
            message: '{VALUE} is not a valid e-mail address'
        }
    },
    phone: {
        type: String,
        validate: {
            //regular expression from emailregex.com
            validator: function(v) {
                return /^\+\d{9,20}$/.test(v);
            },
            message: '{VALUE} is not a valid telephone number'
        }
    },
    skype: String,
    website: String,
    companyName: String,
    avatar: String,
    role: {
        type: String,
        required: true,
        validate: {
            validator: function(v){
                return /administrator|tester/i.test(v);
            },
            message: '{VALUE} is not a valid user role'
        }
    }

});
var user = mongoose.model('user', userSchema);

//**********************************************

var testSuiteSchema = Schema({
    _id: Number,
    suiteName: {type: String, required: true},
    suiteDiscription: {type: String, required: true},
    project: {type: Number, required: true},
    suitePriority: Number,
    //I've decided to use only Ids here as reference
    //and the same is valid for proceedings
    testIds: [Number]
});

var testSchema =Schema({
    _id: Number,
    testName: {type: String, required: true},
    testDescription: {type: String, required: true},
    automated: Boolean,
    preConditions: {type: String, required: true},
    stepIds: [Number]
});

var stepSchema= Schema({
    stepNumber: Number,
    stepDescription: {type: String, required: true},
    expectedResult: {type: String, required: true}
});

var step = mongoose.model('step', stepSchema);
var test = mongoose.model('test', testSchema);
var testSuite = mongoose.model('testSuite', testSuiteSchema);

//**********************************************

var defectSchema = new Schema({
    randomId: Number,
    name: {type: String, required: true},
    whoFind: String,
    assignedTo: String,
    dateOfDefectCreation: Date,
    priority: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /critical|high|normal|low/i.tests()
            },
            message: '{Value} is not allowed'
        }
    },
    description: {type: String, required: true},
    //again just ids
    stepsToReproduse: [Number],
    testRunId: Number
});
var defect = mongoose.model('defect', defectSchema) ;

