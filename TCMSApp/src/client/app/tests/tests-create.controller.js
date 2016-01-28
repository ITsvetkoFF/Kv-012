(function () {
    'use strict';

    angular
        .module('app.tests')
        .controller('TestsCreateController', TestsCreateController);

    TestsCreateController.$inject = ['logger', 'TestsService', '$stateParams', 'apiUrl', '$resource', '$state'];
    /* @ngInject */
    function TestsCreateController(logger, TestsService, $stateParams, apiUrl, $resource, $state) {
        var vm = this;

        if ($stateParams.currentSuite === null) return $state.go('tests-list');

        vm.addStep = addStep;
        vm.delStep = delStep;
        vm.stepsEmpty = stepsEmpty;
        vm.submitAddCase = submitAddCase;
        vm.currentSuite = $stateParams.currentSuite;
        vm.priority = ['Low', 'Medium', 'Critical', 'High'];
        vm.steps = [];
        vm.created = new Date().getTime();

        addStep();
        addStep();

        var testsLen = vm.currentSuite.stests.length;
        var lastTest = vm.currentSuite.stests[testsLen - 1];
        if (testsLen > 0) vm._id = lastTest._id + 1;

        vm.casePriority = 'Low';
        vm.creator = 'John Doe';
        vm.caseSprint = vm.sprint[vm.sprint.length - 1].toString();

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
            var newCase = {
                testName: vm.testName,
                testDescription: vm.testDescription,
                automated: true,
                preConditions: vm.preConditions,
                suite: vm.currentSuite._id,
                created: vm.created,
                steps: vm.steps,
                priority: vm.casePriority
            };

            vm.currentSuite.stests.push(newCase);

            logger.success('New Case created');

            var newTestCase = $resource(apiUrl.suiteTests, {}, {});

            newTestCase.save(newCase);

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
