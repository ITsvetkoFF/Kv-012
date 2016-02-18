(function () {
    'use strict';

    angular
        .module('app.runsExec')
        .controller('RunsExecuteController', RunsExecuteController);

    RunsExecuteController.$inject = ['$stateParams', '$state', 'logger','moment','RunsApiService', '$interval'];

    function RunsExecuteController($stateParams, $state, logger, moment,  RunsApiService, $interval) {

        var vm = this;
        vm.run = undefined;
        vm.isExecuting = false;
        vm.intervalOfExecution = 0;
        vm.selectedStepIndex = 0;
        vm.changeStepStatus = changeStepStatus;
        vm.startRun = startRun;
        vm.intervalTask = undefined;

        activate();

        function activate() {

            if (!RunsApiService.currentRun()) {
                RunsApiService.getRuns().get({id: $stateParams.id}).$promise.then(processData, processError);
            }
            else
            {
                processData(RunsApiService.currentRun());
            }

        }

        function processError(error) {
            $state.go('runs/list');
        }

        function processData(result) {
            //TODO: change this temporary solution of exchanging run data between edit and run tabs
            vm.run = result;

            if (!vm.run.tests) {
                RunsApiService.getTestsOfRun(vm.run._id).query().$promise
                    .then(function (tests) {
                        vm.run.tests = JSON.parse(JSON.stringify(tests));
                        vm.progress = getProgress();
                        vm.suites = getSuites();
                        vm.selectedSuite = vm.suites[0];
                        vm.selectedTest = vm.run.tests[0];
                        sortTests();
                    });
            } else {
                vm.progress = getProgress();
                vm.suites = getSuites();
                vm.selectedSuite = vm.suites[0];
                vm.selectedTest = vm.run.tests[0];
                sortTests();
            }
        }

        function startRun() {
            var currentDate = 0, dateStart = 0, interval = 0;//store for current time

            if (vm.isExecuting) {
                vm.isExecuting = false;
                $interval.cancel(vm.intervalTask);
                vm.intervalTask = undefined;
            } else
            {
                vm.isExecuting = true;
                if (vm.run.status === 'new') {
                    vm.run.status = 'pending';
                    vm.run.dateStart = (new Date()).toISOString();
                }
                dateStart = Date.parse(vm.run.dateStart);
                vm.intervalTask = $interval(function() {
                    currentDate = Date.now();
                    interval = Math.round((currentDate - dateStart) / 1000) * 1000;
                    vm.intervalOfExecution = interval;
                }, 1000);

            }
        }

        function getProgress() {

            var numberOfTests = vm.run.tests.length;
            var progress = {passed: 0, failed: 0, pending: 0, length: numberOfTests};

            for (var i = 0; i < numberOfTests; i++) {
                if (vm.run.tests[i].status === 'passed') progress.passed++;
                if (vm.run.tests[i].status === 'failed') progress.failed++;
                if (vm.run.tests[i].status === 'pending') progress.pending++;
            }

            return progress;
        }

        function getSuites() {
           var suites = [];
           var numberOfTests = vm.run.tests.length;

           for (var i = 0; i < numberOfTests; i++) {
               if (!suites.some(function(x) {return x === vm.run.tests[i].suite;})) suites.push(vm.run.tests[i].suite);
           }

           return suites;
       }
        function sortTests() {
            var sortedTests = [];
            var i = 0;
            for (i; i < vm.suites.length; i++) {
                vm.run.tests.forEach(function (test) {
                    if (test.suite === vm.suites[i]) sortedTests.push(test);
                });
            }
            vm.run.tests = sortedTests;
        }
        function changeStepStatus (step, isLastStep, testCase) {
            var indexOfSelectedTest = vm.run.tests.indexOf(vm.selectedTest);
            if (vm.isExecuting) {
                //this changes the navigation view
                vm.selectedTest = testCase;

                if (vm.selectedTest.suite !== vm.selectedSuite) {
                    vm.selectedSuite = vm.selectedTest.suite;
                }

                //here we implement the step status changing
                if (step.status === 'passed') step.status = 'failed';
                else step.status = 'passed';

                //after finishing the testCase execution we'll change its status
                if (isLastStep) {
                    if (testCase.steps.every(step => step.status === 'passed')) { //jshint ignore:line
                        testCase.status = 'passed';
                    } else if (testCase.steps.some(step => step.status === 'pending')) { //jshint ignore:line
                        testCase.status = 'pending';
                    } else {
                        testCase.status = 'failed';
                    }
                    vm.progress = getProgress();
                    vm.selectedStepIndex = 0;
                }

                //if we have finished the very last test case
                if (isLastStep && ((indexOfSelectedTest + 1) < vm.run.tests.length)) {
                    vm.selectedTest = vm.run.tests[indexOfSelectedTest + 1];
                    if (vm.selectedTest.suite !== vm.selectedSuite) {
                        vm.selectedSuite = vm.selectedTest.suite;
                    }
                }
            }
        }
    }

})();
