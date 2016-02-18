var express = require('express');
var passport = require('passport');
var router = express.Router();
var LocalStrategy = require('passport-local');
var User = require('../model/mschemas/user.js');
var bcrypt = require('bcrypt-nodejs');
var TrelloStrategy = require('passport-trello').Strategy;

var TRELLO_ID = '661d5fc5e58a01d692762e9165414c4f';
var TRELLO_SECRET = '9a3f476a48bc202d0eaee4773f7aa7fa3b5d60e46c88e10c6289b0bfff7ea7f2';
var TRELLO_CALLBACK = 'http://localhost:3000/register/trello/callback';

passport.use('trello', new TrelloStrategy({
        consumerKey: TRELLO_ID,
        consumerSecret: TRELLO_SECRET,
        callbackURL: TRELLO_CALLBACK,
        passReqToCallback: true,
        trelloParams: {
            scope: 'read,write',
            name: 'TCMS',
            expiration: 'never'
        }
    },
    function(req, token, tokenSecret, profile, done) {
        var findOrCreateUser = function() {
            User.findOne({'trelloUserID': profile.id},function(err, user) {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, user);
                } else {
                    var newUser = new User();
                    newUser.fullName = profile.displayName;
                    newUser.trelloUserID = profile.id;
                    newUser.trelloToken = token;

                    newUser.save(function(err) {
                        if (err) {
                            return done(err);
                        }
                        return done(null, newUser);
                    });
                }
            });
        };

        // Delay the execution of findOrCreateUser and execute
        // the method in the next tick of the event loop
        process.nextTick(findOrCreateUser);
    })
);

passport.use('local_reg', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        console.log('registration begins 1');
        var findOrCreateUser = function() {
            User.findOne({'email': username},function(err, user) {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, false,
                        req.flash('message','User Already Exists'));
                } else {
                    var newUser = new User();
                    //newUser.pass = createHash(password);
                    newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
                    newUser.email = req.body.username;
                    newUser.fullName = req.body.fullName;
                    newUser.role = 'administrator';

                    newUser.save(function(err) {
                        if (err) {
                            return done(err);
                        }
                        return done(null, newUser);
                    });
                }
            });
        };

        // Delay the execution of findOrCreateUser and execute
        // the method in the next tick of the event loop
        process.nextTick(findOrCreateUser);
    }
));

router.post('/local', passport.authenticate('local_reg', {successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
}));

router.get('/trello/callback',
    passport.authenticate('trello', {failureRedirect: '/register'}),
    function(req, res) {
        res.redirect('/dashboard');
    });

router.post('/trello', passport.authenticate('trello'));

module.exports = router;
