var express = require('express');
var router = express.Router();
var User = require('../model/mschemas/user.js');

router.get('/', function(req, res) {
    if (req.user) {
        User.findOne({'_id': req.user._id}, function (err, user) {
            if (err) {
                res.send(err);
            }
            if (user) {
                res.json(user);
            }
            res.end();
        });
    }
});

router.post('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
