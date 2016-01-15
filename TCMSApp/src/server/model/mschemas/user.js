// import the necessary modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create  the user model

    // define schema
    var userSchema = new Schema({
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        userName: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        email: {
            type: String,
            required: true,
            lowercase: true,
            validate: {
                //regular expression from emailregex.com
                validator: function (v) {
                    return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(v);
                },
                message: '{VALUE} is not a valid e-mail address'
            }
        },
        phone: {
            type: String,
            validate: {
                //regular expression was created by my own
                validator: function (v) {
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
            enum: ['tester', 'administrator']
        }

    });

    var user = mongoose.model('User', userSchema);
module.exports = user;

