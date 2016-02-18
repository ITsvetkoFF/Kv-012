var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('validator');

var userSchema;
userSchema = new Schema({
    fullName: {type: String},
    password: {type: String},
    currentProjectID: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
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

