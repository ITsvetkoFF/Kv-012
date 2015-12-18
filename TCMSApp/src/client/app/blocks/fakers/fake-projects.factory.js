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
(function () {
    "use strict";


    angular
        .module('app.fakers')
        .factory('FakeProjectsFactory', FakeProjectsFactory);

    FakeProjectsFactory.$inject = ['faker'];

    function FakeProjectsFactory(faker) {


        /**
         * Generate specified number of fake project objects
         * ```
         * {
          *"name": "string",
          *"description": "string",
          *"dateStart": "date",
          *"dateEnd": "date",
          *"users": [ "int" ]
          *"suites": [ "int" ]
          *}
         * ```
         * @memberOf fakeProjectsFactory
         * @param {number} quantity default = 1; positive number of projects
         * @returns {Array.<{Object}>} description
         *
         */
        var getFakeProjects= function (quantity) {
            var quantity = quantity || 1;
            var projects = [];

            function getUsers(quantity){
                var users = [];
                for (var i = 0; i < Math.random() * 10; i++) {
                    users.push(faker.random.number());
                }
                return users;
            }

            function getSuites(quantity){
                var suites = [];
                for (var i = 0; i < Math.random() * 10; i++) {
                    suites.push(faker.random.number());
                }
                return suites;
            }


            var i = -1;
            while (++i < quantity) {
                var project = {
                'name':faker.company.companyName(),
                'description': faker.lorem.sentence(),
                'users': getUsers(4),
                'suites' : getSuites(10),
                'dateStart' : faker.date.past(),
                'dateEnd' : faker.date.future()
                };
                projects.push(project);
            }

            return projects;
        };

        return getFakeProjects;
    }

})();
