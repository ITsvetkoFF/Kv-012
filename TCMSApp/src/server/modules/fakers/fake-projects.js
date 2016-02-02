var faker = require('faker');

/**
 * @ngdoc factory
 * @name fakeProjectsFactory
 * @memberOf app.fakers
 * @example
 * FakeProjectsFactory(1);
 * @description
 *  Generates specified amount of fake projects objects
 *
 */

var getFakeProjects = function (quantity, users) {
    quantity = quantity || 1;
    quantity = (quantity < 1) ? 1 : quantity;
    var projects = [];

    quantity = quantity || 1;

    function getUsers(quantity, admin) {
        var rndUsersIDs = [];
        for (var i = 0; i < quantity; i++) {
            var rndUserID = users[faker.random.number(users.length - 1)]._id;
            if (rndUserID !== admin && rndUsersIDs.indexOf(rndUserID) === -1)
                rndUsersIDs.push(rndUserID);
        }
        return rndUsersIDs;
    }

    for (var i = 0; i < quantity; i++) {
        var admin = users[faker.random.number(users.length - 1)]._id;

        var project = {
            'name': faker.company.companyName(),
            'description': faker.lorem.sentence(),
            'admins': [admin],
            'users': getUsers(faker.random.number(users.length - 1), admin),
            'dateStart' : faker.date.past(),
            'dateEnd' : faker.date.future()
        };

        projects.push(project);
    }

    return projects;
};

module.exports = getFakeProjects;
