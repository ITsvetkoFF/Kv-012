var faker = require('faker');

function getFakeSuites(quantity, projects) {
    quantity = quantity || 1;
    quantity = (quantity < 1) ? 1 : quantity;
    var suites = [];

    for (var i = 0; i < quantity; i++) {
        suites[i] = {
            suiteName: faker.lorem.sentence(1, 2).slice(0, -1),
            suiteDescription: faker.lorem.sentence(),
            project: projects[faker.random.number(projects.length - 1)]._id,
            tests: []
        };
    }

    return suites;
}

module.exports = getFakeSuites;
