(function () {
    'use strict';

    angular
        .module('app.tests')
        .controller('TestsCreateController', TestsCreateController);

    TestsCreateController.$inject = ['logger', 'TestsService'];
    /* @ngInject */
    function TestsCreateController(logger, TestsService) {
        var vm = this;

        activate();

        vm.addStep = addStep;
        vm.delStep = delStep;
        vm.submitAddCase = submitAddCase;
        vm.currentSuite = TestsService.getCurrentSuite();
        vm.steps = [];
        addStep();
        addStep();

        vm.sprint = "None";


        function activate() {
            logger.info('Activated New Case View');
        }

        function addStep(){
            var stepNumber = vm.steps.length + 1;
            var newStep = {
                           stepNumber: stepNumber,
                           stepDescription: "",
                           expectedResult: ""
                          };
            vm.steps.push(newStep);
        }

        function delStep($index) {
            vm.steps.splice($index,1);
        }

        function submitAddCase() {
            var newCase = {};
            newCase.testName = vm.testName;
            newCase.testDescription = vm.testDescription;
            newCase.sprint = vm.sprint;
            newCase.preConditions = vm.preConditions;
            newCase.steps = vm.steps;
            vm.currentSuite.tests.push(newCase);
            TestsService.setCurrentSuite(vm.currentSuite);
        }

    }

})();
