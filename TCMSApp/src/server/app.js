/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var restify = require('express-restify-mongoose');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 8001;
var four0four = require('./utils/404')();
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

var register = require('./routes/register');
var login = require('./routes/login');
var userRoute = require('./routes/user');

var docs = require('express-mongoose-docs');

var environment = process.env.NODE_ENV;

var router = express.Router();

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));

//Get mongoose models
var defect =  require('./model/mschemas/defect');
var project =  require('./model/mschemas/project');
var run =  require('./model/mschemas/run');
var suite =  require('./model/mschemas/suite');
var test =  require('./model/mschemas/test');
var user =  require('./model/mschemas/user');

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

// Create API with 'express-restify-mongoose'
restify.serve(router, defect);
restify.serve(router, project);
restify.serve(router, run);
restify.serve(router, suite);
restify.serve(router, user);
restify.serve(router, test.runTest);
restify.serve(router, test.suiteTest);

app.use(session({secret: 'TCMS', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(router);

app.use('/login', login);
app.use('/register', register);
app.use('/api/v1/User', userRoute);

//Generate API Docs
docs(app, mongoose);

switch (environment){
    case 'build':
        console.log('** BUILD **');
        app.use(express.static('./build/'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function(req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./build/index.html'));
        break;
    case 'test':
        console.log('** TEST **');
        // Connect to local MongoDB
        mongoose.connect('mongodb://localhost/TCMSdb-test', function(err) {
            if (err) console.log('\x1b[41m', 'Connection failed ' + err,'\x1b[0m');
        });

        app.use(express.static('./src/client/'));
        app.use(express.static('./'));
        app.use(express.static('./tmp'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function(req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./src/client/index.html'));
        break;
    default:
        console.log('** DEV **');
        // Connect to local MongoDB
        mongoose.connect('mongodb://localhost/TCMSdb', function(err) {
            if (err) console.log('\x1b[41m', 'Connection failed ' + err,'\x1b[0m');
        });

        app.use(express.static('./src/client/'));
        app.use(express.static('./'));
        app.use(express.static('./tmp'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function(req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./src/client/index.html'));

        break;
}

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname  +
        '\nprocess.cwd = ' + process.cwd());
});

