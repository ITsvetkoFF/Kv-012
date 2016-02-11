var faker = require('faker');
var mongoClient = require('mongodb').MongoClient;
var fakeRuns = require('./fakers/fake-runs');
var fakeUsers = require('./fakers/fake-users');
var fakeProjects = require('./fakers/fake-projects');
var fakeSuites = require('./fakers/fake-suites');
var fakeSuiteTests = require('./fakers/fake-tests').getSuiteTests;
var fakeRunTest = require('./fakers/fake-tests').getRunTests;
var fakeDefects = require('./fakers/fake-defects');

var refillDB = function() {
    mongoClient.connect('mongodb://localhost/TCMSdb', function(err, db) {
        db.dropDatabase();

        var usersCollection = db.collection('users');
        var users = fakeUsers(faker.random.number({min: 5, max: 12}));
        usersCollection.insertMany(users);

        var projectsCollection = db.collection('projects');
        var projects = fakeProjects(faker.random.number({min: 3, max: 8}), users);
        projectsCollection.insertMany(projects);

        var suitesCollection = db.collection('suites');
        var suites = fakeSuites(faker.random.number({min: 12, max: 25}), projects);
        suitesCollection.insertMany(suites);

        var runsCollection = db.collection('runs');
        var runs = fakeRuns(faker.random.number({min: 20, max: 50}), users, projects);
        runsCollection.insertMany(runs);

        var runTestsCollection = db.collection('runtests');
        var runTests = fakeRunTest(faker.random.number({min: 200, max: 350}), runs);
        runTestsCollection.insertMany(runTests);

        var suiteTestsCollection = db.collection('suitetests');
        var suiteTests = fakeSuiteTests(50, suites);
        suiteTestsCollection.insertMany(suiteTests);

        var defectsCollection = db.collection('defects');
        var defects = fakeDefects(faker.random.number({min: 0, max: 15}), users, runs,projects);
        defectsCollection.insertMany(defects);

        usersCollection.updateMany({},
            {$set: {currentProjectID: projects[faker.random.number(projects.length - 1)]._id}});

        db.close();

    });
};

module.exports = refillDB;
