var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('../model/mschemas/user.js');
var bcrypt = require('bcrypt-nodejs');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local', new LocalStrategy(
    function(username, password, done) {
        console.log('it starts work');
        User.findOne({email: username}, function(err, user) {
            if (err) {return done(err); }
            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }
            if (!isValidPassword(user, password)) {
                return done(null, false, {message: 'Incorrect password.'});
            }
            console.log('everything is ok');
            return done(null, user);
        });
    }
));

router.post('/local',
    passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login', failureFlash: true})
);

function isValidPassword(user, password) {
    return bcrypt.compareSync(password, user.password);
}

module.exports = router;
