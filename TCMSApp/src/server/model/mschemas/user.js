// import the necessary modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('validator');

// create  the user model

// define schema
var userSchema;
userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    currentProjectID: String,
    trelloUserID: String,
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return validator.isEmail(v);
            },
            message: '{VALUE} is not a valid e-mail address'
        }
    },
    avatar: String,
    role: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /administrator|user/i.test(v);
            },
            message: '{VALUE} is not a valid user role'
        }
    }

});
var user = mongoose.model('User', userSchema);
module.exports = user;

