/**
 * @ngdoc factory
 * @name fakeTestsFactory
 * @memberOf app.fakers
 * @example
 * fakeTestsFactory(1);
 * @description
 *  Returns a test suite with test cases, filled with steps
 *
 */

(function() {
    'use strict';

    angular.module('app.fakers')
        .factory('FakeTestsFactory', FakeTestsFactory);

    FakeTestsFactory.$inject = ['faker'];

    function FakeTestsFactory(faker) {

        return {

            /**
             *
             * Returns a test suite with test cases, filled with steps
             *
             * ```
             * {
               * _id: "int"
               * suiteName: "string"
               * suiteDescription: "string"
               * project: "int"
               * suitePriority: "int"
               * tests:
               * [
                   * {
                       * _id: "int"
                       * testName: "string"
                       * testDescription: "string"
                        * automated: "bool"
                        * preConditions: "string"
                        * steps:
                        * [
                            *{
                            *    stepNumber: "int"
                            *    stepDescription: "string"
                           *     expectedResult: "string"
                          *  },
                         *   {
                        *        stepNumber: "int"
                       *         stepDescription: "string"
                      *          expectedResult: "string"
                     *       }
                    *    ]
                   * },
                   * {
                       * _id: "int"
                       * testName: "string"
                       * testDescription: "string"
                       * automated: "bool"
                       * pre-conditions: "string"
                       * steps:
                       * [
                         *   {
                         *       stepNumber: "int"
                        *        stepDescription: "string"
                       *         expectedResult: "string"
                      *      },
                      *      {
                     *           stepNumber: "int"
                    *            stepDescription: "string"
                   *             expectedResult: "string"
                  *          }
                 *       ]
                *    }
               * ]
              *  }
             * ```
             *
             *
             * @memberOf fakeTestsFactory
             * @param {Number} testNumber
             * @returns {Array.<{Object}>} an array of objects
             */

            getTests: function (testNumber) {
                // Test Suite creating
                var testSuite = {};
                testSuite._id = faker.random.uuid();
                testSuite.suiteName = faker.lorem.sentence(2, 5);
                testSuite.project = faker.random.uuid();
                testSuite.suitePriority = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
                testSuite.tests = [];

                var i = 0, l = testNumber;

                // Test cases adding
                for (i = 0; i < l; i++) {

                    // Test case creating
                    var testCase = {};

                    testCase._id = faker.random.uuid();
                    testCase.testName = faker.lorem.sentence(2, 3);
                    testCase.testDescription = faker.lorem.sentence(4, 30);
                    testCase.automated = faker.random.boolean();
                    testCase.preConditions = faker.lorem.sentence(5, 20);

                    // Test case steps creating
                    var numSteps = Math.floor(Math.random() * (40 - 3 + 1)) + 3;
                    testCase.steps = [];

                    var j;
                    for (j = 0; j < numSteps; j++) {
                        var step = {};

                        step.stepNumber = j + 1;
                        step.stepDescription = faker.lorem.sentence(3, 15);
                        step.expectedResult = faker.lorem.sentence(2, 10);

                        testCase.steps.push(step);
                    }

                    testSuite.tests.push(testCase);
                }

                return testSuite;
            }
        }

    }

})();
