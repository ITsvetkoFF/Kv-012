(function () {
    "use strict";

    angular
        .module('app.fakers')
        .service('FakeRunsService', FakeRunsService);

    FakeRunsService.$inject = ['faker'];

    /**
     * @memberOf app.fakers
     * @ngdoc service
     * @constructor
     */
    function FakeRunsService() {
        /**
         * @function getFakeRuns
         * @description return concrete amount of fake runs
         * @param quantity - quantity of generated fake runs
         * @returns {Array} - array of run objects
         *
         * {
                "_id": "int",
                "previousRunId": "int",
                "dateStart": "date",
                "dateEnd": "date",
                "build": "string",
                "environment": "string",
                "status": "string: [passed, executing, failed]",
                "tests": [
                    {
                        "id": "int",
                        "status": "boolean",
                        "steps": [
                            {
                                "number": "int",
                                "action": "string",
                                "expected": "string",
                                "status": "string: [passed, blocked, failed]"
                            }
                        ]
                    }
                ]
            }
         *
         */
        this.getFakeRuns = function (quantity) {
            var quantity = quantity || 1;
            var runs = [];
            var runStatuses = ['passed', 'executing', 'failed'];
            var testStatuses = ['passed', 'executing', 'failed'];
            var stepStatuses = ['passed', 'blocked', 'failed'];

            /**
             * @memberOf getFakeRuns
             * @function getSteps
             * @param quantity
             * @returns {Array}
             */
            function getSteps(quantity) {
                var steps = [];
                let i = -1;
                while (++i < quantity) {
                    let step = {
                        number: faker.random.number(),
                        action: faker.lorem.sentence(),
                        expected: faker.lorem.sentence(),
                        status: stepStatuses[faker.random.number(stepStatuses.length - 1)]
                    };

                    steps.push(step);
                }
                return steps;
            }

            /**
             * @memberOf getFakeRuns
             * @function getTests
             * @param quantity
             * @returns {Array}
             */
            function getTests(quantity) {
                var tests = [];
                let i = -1;
                while (++i < quantity) {
                    let test = {
                        id: faker.random.number(1000),
                        status: faker.random.boolean(),
                        steps: getSteps(faker.random.number(10))
                    };

                    tests.push(test);
                }
                return tests;
            }

            /**
             * @memberOf getFakeRuns
             * @name i
             * @description loop counter
             * @type {number}
             */
            let i = -1;
            while (++i < quantity) {
                /**
                 *
                 * @type {{_id: *, previousRunId: *, dateStart: *, dateEnd: *, build: *, environment: string, status: string, tests: Array}}
                 */
                let run = {
                    _id: faker.random.number(1000000),
                    previousRunId: faker.random.number(1000000),
                    dateStart: faker.date.past(),
                    dateEnd: faker.date.past(),
                    build: faker.random.number(1000),
                    environment: faker.lorem.words() + ', browser: ' +  faker.internet.userAgent(),
                    status: runStatuses[faker.random.number(runStatuses.length - 1)],
                    tests: getTests(faker.random.number(10))
                };
                runs.push(run);
            }

            return runs;
        };
    }
})();
