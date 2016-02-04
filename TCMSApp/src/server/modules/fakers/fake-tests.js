var faker = require('faker');

function getSuiteTests(quantity, suites) {
    quantity = quantity || 1;
    quantity = (quantity < 1) ? 1 : quantity;
    var suiteTests = [];
    var priorities = ['Low', 'Medium', 'High', 'Critical'];

    for (var i = 0; i < quantity; i++) {
        suiteTests[i] = {
            testName: faker.lorem.sentence().slice(0, -1),
            testDescription: faker.lorem.sentence(),
            automated: faker.random.boolean(),
            preConditions: faker.lorem.sentence(),
            suite: suites[faker.random.number(suites.length - 1)]._id,
            created: faker.date.past(),
            priority: priorities[faker.random.number(priorities.length - 1)],
            steps: getSuiteSteps(faker.random.number(10))
        };
    }

    return suiteTests;
}

function getRunTest(quantity, runs) {
    quantity = quantity || 1;
    quantity = (quantity < 1) ? 1 : quantity;
    var runTests = [];
    var suites = [
        faker.lorem.sentence(1, 1).slice(0, -1),
        faker.lorem.sentence(1, 1).slice(0, -1),
        faker.lorem.sentence(1, 1).slice(0, -1)
    ];

    for (var i = 0; i < quantity; i++) {
        var suite = suites[0];
        var run = runs[faker.random.number(runs.length - 1)];

        if (faker.random.number(100) > 80) {
            suite = suites[1];
        }
        if (faker.random.number(100) > 91) {
            suite = suites[2];
        }

        runTests[i] = {
            testName: faker.lorem.sentence().slice(0, -1),
            testDescription: faker.lorem.sentence(),
            automated: faker.random.boolean(),
            preConditions: faker.lorem.sentence(),
            suite: suite,
            created: faker.date.past(),
            run: run._id,
            steps: getRunSteps(faker.random.number(10), run)
        };
    }

    for (i = 0; i < runTests.length; i++) {
        var status = 'passed';

        for (var j = 0; j < runTests[i].steps.length; j++) {
            if (runTests[i].steps[j].status === 'passed') continue;
            status = 'failed';
            break;
        }

        runTests[i].status = status;
    }

    return runTests;
}

function getRunSteps(quantity, run) {
    quantity = quantity || 1;
    quantity = (quantity < 1) ? 1 : quantity;
    var steps = [];
    var stepStatuses = ['passed','failed', 'blocked'];
    var failedStepsNum = faker.random.number({min: 1, max: quantity * 0.8});

    for (var i = 0; i < quantity; i++) {
        var status = stepStatuses[0];

        if (run.status === 'failed' && i > failedStepsNum) {
            status = faker.random.number({min: 1, max: 2});
        }

        steps[i] = {
            stepDescription: faker.lorem.sentence(),
            expectedResult: faker.lorem.sentence(),
            status: status
        };
    }

    return steps;
}

function getSuiteSteps(quantity) {
    quantity = quantity || 1;
    quantity = (quantity < 1) ? 1 : quantity;
    var steps = [];

    for (var i = 0; i < quantity; i++) {
        steps[i] = {
            stepDescription: faker.lorem.sentence(),
            expectedResult: faker.lorem.sentence()
        };
    }

    return steps;
}

module.exports = {
    getSuiteTests: getSuiteTests,
    getRunTests: getRunTest
};
