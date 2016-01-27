(function () {
    'use strict';

    angular
        .module('app.tests')
        .controller('TestsCreateController', TestsCreateController);

    TestsCreateController.$inject = ['logger', 'TestsService', '$timeout'];
    /* @ngInject */
    function TestsCreateController(logger, TestsService, $timeout) {
        var vm = this;

        vm.title = 'Create Test Case';
        vm.addStep = addStep;
        vm.delStep = delStep;
        vm.stepsEmpty = stepsEmpty;
        vm.submitAddCase = submitAddCase;
        vm.currentSuite = TestsService.getCurrentSuite();
        vm.category = TestsService.getCategory();
        vm.priority = TestsService.getPriority();
        vm.sprint = TestsService.getSprint();
        vm.steps = [];
        addStep();

        // date
        var created = new Date();
        vm.created = created.getTime();
        // id
        var testsLen = vm.currentSuite.tests.length;
        var lastTest = vm.currentSuite.tests[testsLen - 1];
        vm._id = 1;
        if (testsLen > 0) vm._id = lastTest._id + 1;
        // other
        vm.casePriority = '2';
        vm.caseCategory = '10';
        vm.creator = 'John Doe';
        vm.caseSprint = vm.sprint[vm.sprint.length - 1].toString();
        vm.onCrtlEnterPress = onCrtlEnterPress;

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
            var newCase = {};
            newCase.testName = vm.testName;
            newCase.casePriority = vm.casePriority;
            newCase.caseCategory = vm.caseCategory;
            newCase.created = vm.created;
            newCase.creator = vm.creator;
            newCase._id = vm._id;
            newCase.issues = 0;
            newCase.testDescription = vm.testDescription;
            newCase.caseSprint = vm.caseSprint;
            newCase.preConditions = vm.preConditions;
            newCase.steps = vm.steps;
            vm.currentSuite.tests.push(newCase);
            TestsService.setCurrentSuite(vm.currentSuite);
            logger.success('New Case created');

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
