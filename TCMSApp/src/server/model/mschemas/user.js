var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('validator');

var userSchema;
userSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    fullName: {type: String},
    password: {type: String},
    currentProjectID: String,
    trelloUserID: String,
    trelloToken: String,
    email: {
        type: String,
        lowercase: true,
        validate: {
            validator: function (v) {
                return validator.isEmail(v);
            },
            message: '{VALUE} is not a valid e-mail address'
        }
    },
    avatar: String,
    projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}]

});
var user = mongoose.model('User', userSchema);
module.exports = user;

