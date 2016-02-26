(function () {
    'use strict';

    angular
        .module('app.runsExec')
        .controller('RunsExecuteController', RunsExecuteController);

    RunsExecuteController.$inject =
        ['$stateParams', '$state', 'logger','moment','RunsApiService', '$interval', '$timeout'];

    function RunsExecuteController($stateParams, $state, logger, moment,  RunsApiService, $interval, $timeout) {

        var vm = this;
        vm.run = undefined;
        vm.isExecuting = false;
        vm.intervalOfExecution = 0;
        vm.selectedStepIndex = 0;
        vm.changeStepStatus = changeStepStatus;
        vm.startRun = startRun;
        vm.intervalTask = undefined;
        vm.viewAllSteps = false;

        activate();

        function activate() {
            if (!RunsApiService.currentRun()) {
                RunsApiService.getRunResource().get({id: $stateParams.id}).$promise.then(processData, processError);
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
            if (vm.run.intervalOfExecution) vm.intervalOfExecution = vm.run.intervalOfExecution;
            console.log(vm.intervalOfExecution);

            if (!vm.run.tests) {
                RunsApiService.getTestsOfRunResource(vm.run._id).query().$promise
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

            if (vm.isExecuting) {
                vm.isExecuting = false;
                $interval.cancel(vm.intervalTask);
                vm.intervalTask = undefined;
                vm.run.intervalOfExecution = vm.intervalOfExecution;

                saveRunProgress();

                logger.info('Execution of ' + vm.selectedTest.testName + ' paused.');
            } else
            {
                vm.isExecuting = true;

                logger.info('Execution of ' + vm.selectedTest.testName + ' started.');

                if (vm.run.status === 'new') {
                    vm.run.status = 'pending';
                    vm.run.dateStart = (new Date()).toISOString();
                }
                vm.intervalTask = $interval(function() {
                    vm.intervalOfExecution += 1000;
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
        function changeStepStatus (step, indexOfCurrentStep, testCase) {
            var indexOfSelectedTest = vm.run.tests.indexOf(vm.selectedTest);
            var stepsToReproduce = '';
            var descriptionOfDefect = '';
            var i = 0; //indexator for the loops

            if (vm.isExecuting) {
                //this changes the navigation view
                vm.selectedTest = testCase;

                if (vm.selectedTest.suite !== vm.selectedSuite) {
                    vm.selectedSuite = vm.selectedTest.suite;
                }

                //here we implement the step status changing
                if (step.status === 'passed') {
                    step.status = 'failed';

                    for (i = 0; i <= indexOfCurrentStep; i++) {
                        stepsToReproduce += (i + 1) + '. ' + testCase.steps[i].stepDescription + '\n';
                    }

                    descriptionOfDefect = 'EXPECTED RESULT: ' + testCase.steps[indexOfCurrentStep].expectedResult +
                        '\nACTUAL RESULT: ';

                    $state.go('generate-defect', {
                        previousState: $state.current,
                        description: descriptionOfDefect,
                        stepsToReproduce: stepsToReproduce
                    });
                }
                else step.status = 'passed';

                //after finishing the testCase execution we'll change its status
                if (testCase.steps.every(function (step) {
                        return step.status === 'passed';
                    })) {
                        testCase.status = 'passed';

                        if ((indexOfSelectedTest + 1) < vm.run.tests.length) {
                            if (vm.viewAllSteps) {
                                vm.selectedTest = vm.run.tests[indexOfSelectedTest + 1];
                                if (vm.selectedTest.suite !== vm.selectedSuite) {
                                    vm.selectedSuite = vm.selectedTest.suite;
                                }
                            } else {
                                $timeout(function () {
                                    vm.selectedTest = vm.run.tests[indexOfSelectedTest + 1];
                                    if (vm.selectedTest.suite !== vm.selectedSuite) {
                                        vm.selectedSuite = vm.selectedTest.suite;
                                    }
                                }, 1500);
                            }
                        }
                    } else if (testCase.steps.some(function (step) {
                            return step.status === 'pending';
                        })) {
                        testCase.status = 'pending';
                    } else {
                        testCase.status = 'failed';

                        if ((indexOfSelectedTest + 1) < vm.run.tests.length) {
                            if (vm.viewAllSteps) {
                                vm.selectedTest = vm.run.tests[indexOfSelectedTest + 1];
                                if (vm.selectedTest.suite !== vm.selectedSuite) {
                                    vm.selectedSuite = vm.selectedTest.suite;
                                }
                            } else {
                                $timeout(function () {
                                    vm.selectedTest = vm.run.tests[indexOfSelectedTest + 1];
                                    if (vm.selectedTest.suite !== vm.selectedSuite) {
                                        vm.selectedSuite = vm.selectedTest.suite;
                                    }
                                }, 1500);
                            }
                        }
                    }
                vm.progress = getProgress();
                vm.selectedStepIndex = 0;

                if (vm.progress.passed === vm.progress.length) {
                    logger.success(vm.run.name + ' is completed!');
                    vm.run.status = 'passed';
                    saveRunProgress();
                } else if (vm.progress.passed + vm.progress.failed === vm.progress.length) {
                    logger.error(vm.run.name + ' is completed!');
                    vm.run.status = 'failed';
                    saveRunProgress();
                }
            }
            else {
                logger.info('Please hit PLAY button first');
            }
        }
        function saveRunProgress() {
            RunsApiService.getRunResource().get({id: vm.run._id}, function (updateRun) {
                updateRun.status = vm.run.status;
                updateRun.intervalOfExecution = vm.run.intervalOfExecution;
                updateRun.$save(function () {
                    vm.run.tests.forEach(function (test, index) {
                        RunsApiService.RunTestResource().get({id: test._id}, function (updateTest) {
                            updateTest.status = test.status;
                            updateTest.steps = test.steps;
                            updateTest.$save(function () {
                                //if the very last test case is saved the program will fire an success message
                                if (index + 1 === vm.run.tests.length) {
                                    logger.success('Your progress has been saved.');
                                    vm.isExecuting = false;
                                    $interval.cancel(vm.intervalTask);
                                    if (vm.run.status === 'passed') $state.go('runs/list');
                                }
                            }, function (error) {
                                logger.error(error.responceText);
                            });
                        });
                    });
                }, function (error) {
                    logger.error(error.responceText);
                });
            });
        }
    }
})();
