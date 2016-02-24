(function () {
    'use strict';

    angular
        .module('app.tests')
        .controller('TestsCreateController', TestsCreateController);

    TestsCreateController.$inject =
        ['logger', '$timeout', '$stateParams', 'apiUrl', '$resource', '$state', 'user', 'TestsService'];
    /* @ngInject */
    function TestsCreateController(logger, $timeout, $stateParams, apiUrl, $resource, $state, user, TestsService) {
        var vm = this;

        if ($stateParams.currentSuite === null) return $state.go('tests-list');

        vm.title = 'Create Test Case';
        vm.addStep = addStep;
        vm.delStep = delStep;
        vm.stepsEmpty = stepsEmpty;
        vm.submitAddCase = submitAddCase;
        vm.currentSuite = $stateParams.currentSuite;
        vm.priority = ['Low', 'Medium', 'Critical', 'High'];
        vm.steps = [];
        vm.created = new Date().getTime();
        vm.onCrtlEnterPress = onCrtlEnterPress;
        vm.casePriority = 'Low';
        vm.creator = user.fullName;

        if ($stateParams.currentTestCase) {
            vm.title = 'Edit ' + $stateParams.currentTestCase.testName;
            vm.testName = $stateParams.currentTestCase.testName;
            vm.steps = $stateParams.currentTestCase.steps;
            vm.testDescription = $stateParams.currentTestCase.testDescription;
            vm.preConditions = $stateParams.currentTestCase.preConditions;
        }

        if (!$stateParams.currentTestCase) addStep();

        activate();

        function activate() {
            logger.info('Activated New Case View');
        }

        function addStep() {
            var stepNumber = vm.steps.length + 1;
            var newStep = {
                stepNumber: stepNumber,
                stepDescription: '',
                expectedResult: ''
            };
            vm.steps.push(newStep);
        }

        function delStep($index) {
            vm.steps.splice($index, 1);
        }

        function stepsEmpty() {
            var i;
            var stepsLen = vm.steps.length;
            var empty = false;
            for (i = 0; i < stepsLen; i++) {
                if (vm.steps[i].stepDescription === '' || vm.steps[i].expectedResult === '') {
                    empty = true;
                }
            }
            return empty;
        }

        function submitAddCase() {
            var TestCase, newTestCase;
            if ($stateParams.currentTestCase) {
                TestCase = TestsService.getSuiteTestResource($stateParams.currentTestCase._id).get(function () {
                    TestCase.testName = vm.testName;
                    TestCase.testDescription = vm.testDescription;
                    TestCase.automated = true;
                    TestCase.preConditions = vm.preConditions;
                    TestCase.suite = vm.currentSuite._id;
                    TestCase.created = vm.created;
                    TestCase.steps = vm.steps;
                    TestCase.priority = vm.casePriority;

                    TestCase.$save();
                });
            } else {
                TestCase = TestsService.getTestsOfSuite(vm.currentSuite._id);
                newTestCase = new TestCase();

                newTestCase.testName = vm.testName;
                newTestCase.testDescription = vm.testDescription;
                newTestCase.automated = true;
                newTestCase.preConditions = vm.preConditions;
                newTestCase.suite = vm.currentSuite._id;
                newTestCase.created = vm.created;
                newTestCase.steps = vm.steps;
                newTestCase.priority = vm.casePriority;

                newTestCase.$save();
            }

            $state.go('tests-list');

        }

        function onCrtlEnterPress(event) {
            var charCode = (event.keyCode) ? event.keyCode : event.charCode;

            if ((event.ctrlKey && charCode === 13) || (event.ctrlKey && charCode === 10)) {
                addStep();
                $timeout(function () {
                    var textareas = document.getElementsByTagName('textarea');
                    var last = textareas[textareas.length - 2];
                    last.focus();
                }, 0);
            }
        }

    }

})();
