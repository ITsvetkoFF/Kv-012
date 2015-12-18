/**
 * @ngdoc factory
 * @name fakeRunsFactory
 * @memberOf app.fakers
 * @example
 * FakeRunsFactory(1);
 * @description
 *  Generates specified amount of fake run objects
 *
 */
(function () {
    "use strict";


    angular
        .module('app.fakers')
        .factory('FakeRunsFactory', FakeRunsFactory);

    FakeRunsFactory.$inject = ['faker'];

    function FakeRunsFactory(faker) {

        /**
         * Generate specified number of fake run objects
         * ```
         * {
          *"_id": "int",
          *"previousRunId": "int",
          *"dateStart": "date",
          *"dateEnd": "date",
          *"build": "string",
          *"environment": "string",
          *"status": "string: [passed, executing, failed]",
          *"tests": [
          *{
          *"id": "int",
          *"status": "boolean",
          *"steps": [
          *     {
          *          "number": "int",
          *           "action": "string",
          *            "expected": "string",
          *             "status": "string: [passed, blocked, failed]"
          *          }
          *       ]
          *    }
          * ]
          *}
         * ```
         * @memberOf fakeRunsFactory
         * @param {number} quantity default = 1; positive number of runs
         * @returns {Array.<{Object}>} description
         *
         */
        var getFakeRuns = function (quantity) {
            var quantity = quantity || 1;
            var runs = [];
            var runStatuses = ['passed', 'executing', 'failed'];
            var testStatuses = ['passed', 'executing', 'failed'];
            var stepStatuses = ['passed', 'blocked', 'failed'];

            function getSteps(quantity) {
                var steps = [];
                var i = -1;
                while (++i < quantity) {
                    var step = {
                        number: faker.random.number(),
                        action: faker.lorem.sentence(),
                        expected: faker.lorem.sentence(),
                        status: stepStatuses[faker.random.number(stepStatuses.length - 1)]
                    };

                    steps.push(step);
                }
                return steps;
            }

            function getTests(quantity) {
                var tests = [];
                var i = -1;
                while (++i < quantity) {
                    var test = {
                        id: faker.random.number(1000),
                        status: faker.random.boolean(),
                        steps: getSteps(faker.random.number(10))
                    };

                    tests.push(test);
                }
                return tests;
            }

            var i = -1;
            while (++i < quantity) {
                var run = {
                    _id: faker.random.number(1000000),
                    previousRunId: faker.random.number(1000000),
                    dateStart: faker.date.past(),
                    dateEnd: faker.date.past(),
                    build: faker.random.number(1000),
                    environment: faker.lorem.words() + ', browser: ' + faker.internet.userAgent(),
                    status: runStatuses[faker.random.number(runStatuses.length - 1)],
                    tests: getTests(faker.random.number(10))
                };
                runs.push(run);
            }

            return runs;
        };

        return getFakeRuns;
    }

})();
