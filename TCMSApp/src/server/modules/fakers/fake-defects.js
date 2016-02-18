var faker = require('faker');

function getFakeDefects(quantity, users, runs, projects) {
    var defects = [];
    var priorities = ['Critical', 'Low', 'High', 'Normal'];
    var status = ['open', 'inProgress', 'notFix', 'closed'];
    for (var i = 0; i < quantity; i++) {
        defects[i] = {
            name: faker.lorem.sentence(1, 1).slice(0, -1),
            reporter: users[faker.random.number(users.length - 1)]._id,
            date: faker.date.past(),
            priority: priorities[faker.random.number(priorities.length - 1)],
            description: faker.lorem.sentence(),
            status: status[faker.random.number(status.length - 1)],
            stepsToReproduce: getStepsToReproduce(faker.random.number({min: 2, max: 10})),
            run: runs[faker.random.number(runs.length - 1)]._id,
            project: projects[faker.random.number(projects.length - 1)]._id
        };

        //if (faker.random.boolean()) {
        defects[i].assignedTo = users[faker.random.number(users.length - 1)]._id;
        //}
    }

    function getStepsToReproduce(quantity) {
        var steps = [];

        for (var i = 1; i <= quantity; i++) {
            steps[i] = i + '. ' + faker.lorem.sentence();
        }

        return steps;
    }

    return defects;
}

module.exports = getFakeDefects;

