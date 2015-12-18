(function () {
    "use strict";

    angular
        .module('app.fakers')
        .factory('getDefects', getDefects);


    function getDefects() {
        /**
         * @function getDefects
         * @description return array of fake defects
         * @param {number} fakeDefects - quantity of defects
         * @returns {Array} - array of run objects
         * {
                 randomID: "string"
                 name: "string"
                 whoFind: "string"
                 assignedTo: "string"
                 dateOfDefectCreation: "date"
                 description: "string"
                 priority: "string"
                 stepsToReproduce: "string"
                 testRunId: "int"

         }
         ]
         */
        function fakeDefect(number) {
                var priorityVariant = ['Critical', 'High', 'Normal', 'Low'];
                var result = [];
                for (var i = 0; i < number; ++i) {
                    var randomID = faker.random.uuid();
                    var name = faker.name.title();
                    var whoFind = faker.fake('{{name.lastName}}, {{name.firstName}}');
                    var assignedTo = faker.fake('{{name.lastName}}, {{name.firstName}}');
                    var priority = priorityVariant[faker.random.number(priorityVariant.length - 1)];
                    var description = faker.lorem.sentences();
                    var stepsToReproduce = faker.lorem.sentences();
                    var dateOfDefectCreation = faker.date.past(50, new Date("Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)"));
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
                    }
                    result.push(sample);
                }

                return result;
            };

        return fakeDefect;
        };

})();

