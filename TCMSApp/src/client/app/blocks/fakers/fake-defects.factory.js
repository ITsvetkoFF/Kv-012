/**
 * @ngdoc factory
 * @name fakeDefectsFactory
 * @memberOf app.fakers
 * @example
 * FakeDefectsFactory(1);
 * @description
 *  Generates specified amount of fake defects objects
 *
 */

(function () {
    "use strict";

    angular
        .module('app.fakers')
        .factory('FakeDefectsFactory', FakeDefectsFactory);


    FakeDefectsFactory.$inject = ['faker'];

    function FakeDefectsFactory(faker) {
        /**
         * Return array of fake defects
         * {
         *        randomID: "string"
         *        name: "string"
         *        whoFind: "string"
         *        assignedTo: "string"
         *        dateOfDefectCreation: "date"
         *        description: "string"
         *        priority: "string"
         *        stepsToReproduce: "string"
         *        testRunId: "int"
         *
         *   }
         * @memberOf fakeDefectsFactory
         * @param {Number} quantity [1] - quantity of generated fake dafects
         * @returns {Array} - array of run objects
         *
         */
        function fakeDefect(quantity) {
            var quantity = quantity || 1;
            var priorityVariant = ['Critical', 'High', 'Normal', 'Low'];
            var result = [];
            for (var i = 0; i < quantity; ++i) {
                var randomID = faker.random.uuid();
                var name = faker.name.title();
                var whoFind = faker.fake('{{name.lastName}}, {{name.firstName}}');
                var assignedTo = faker.fake('{{name.lastName}}, {{name.firstName}}');
                var priority = priorityVariant[faker.random.number(priorityVariant.length - 1)];
                var description = faker.lorem.sentences();
                var stepsToReproduce = faker.lorem.sentences();
                var dateOfDefectCreation = faker.date.past();
                var testRunId = faker.random.number(1000);

                var sample = {
                    randomID: randomID,
                    name: name,
                    whoFind: whoFind,
                    assignedTo: assignedTo,
                    dateOfDefectCreation: dateOfDefectCreation,
                    priority: priority,
                    description: description,
                    stepsToReproduce: stepsToReproduce,
                    testRunId: testRunId
                };
                result.push(sample);
            }

            return result;
        }

        return fakeDefect;
    }

})();

