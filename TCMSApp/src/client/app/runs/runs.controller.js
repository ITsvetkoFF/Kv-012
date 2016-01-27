/**
 * @ngdoc controller
 * @name runsController
 * @memberOf app.runs
 * @description Controls runs view logic
 */

(function () {
    'use strict';

    angular
        .module('app.runs')
        .controller('RunsController', RunsController);

    RunsController.$inject = ['$scope', 'logger', 'FakeRunsFactory', 'dataWrapper',
        'filterFields', 'RunsApiService', 'moment', '$document'];

    function RunsController($scope, logger, fakeRuns, dataWrapper, filterFields, RunsApiService, moment, $document) {

        var vm = this;
        var checkboxesOnView;
        vm.checkAllModel = {
            checked: false
        };
        vm.setCheckboxModel = function (runId) {
            return vm.checkboxesModels.filter(function (model) {
                return model.runId === runId;
            })[0];
        };
        vm.selectAll = selectAll;
        vm.checkSelectAll = checkSelectAll;

        RunsApiService.query().$promise.then(processData);

        function processData(result) {

            if (result.length === 0) {
                result = fakeRuns(100, 10, 3);
                result.forEach(function (data) {
                    RunsApiService.save(data);
                });

            }

            vm.runs = result;
            vm.checkboxesModels = [];

            vm.runs.map(function (run) {
                vm.checkboxesModels.push({
                    checked: false,
                    runId: run._id
                });
            });

            vm.selectRun = selectRun;
            vm.selectedRuns = [];
            vm.selectedRun = (vm.runs.length === 0 ? null : vm.runs[0]);
            vm.progress = getProgress();
            vm.runCheckBoxClick = runCheckBoxClick;
            vm.testClusters = clusterizeTests();
            vm.filterFields = filterFields.runs.getFields();

            activate();
        }

        function selectAll(event) {
            checkboxesOnView = getRunCheckboxesOnView();
            if (event.target.checked) {
                for (var i = 0; i < checkboxesOnView.length; i++) {
                    vm.checkboxesModels.map(function (model) {
                        if (checkboxesOnView[i].value === model.runId) {
                            model.checked = true;
                            addSelectedRunId(model.runId);
                        }
                    });
                }
            } else {
                for (var j = 0; j < checkboxesOnView.length; j++) {
                    vm.checkboxesModels.map(function (model) {
                        if (checkboxesOnView[j].value === model.runId) {
                            model.checked = false;
                            vm.selectedRuns.splice(vm.selectedRuns.indexOf(model.runId), 1);
                        }
                    });
                }
            }
        }

        function addSelectedRunId(runId) {
            var exists = false;
            vm.selectedRuns.map(function (selectedRunId) {
                if (runId === selectedRunId) {
                    exists = true;
                    return undefined;
                }
            });
            if (!exists) {
                vm.selectedRuns.push(runId);
            }
        }

        // select checkboxes by class. Do not remove 'runCheckBox' class!!!
        function getRunCheckboxesOnView() {
            return $document.find('.runCheckBox');
        }

        /**
         * Activates logger notification
         *
         * @memberOf runsController
         * @example
         * activate();
         */
        function activate() {
            logger.info('Activated Runs View');
        }

        /**
         * calculation number of passed and failed tests in selected run
         * @returns {{passed: number, failed: number, length: *}}
         */
        function getProgress() {
            if (vm.selectedRun === null) return;

            var progress = {passed: 0, failed: 0, length: vm.selectedRun.tests.length};

            for (var i = 0; i < vm.selectedRun.tests.length; i++) {
                if (vm.selectedRun.tests[i].status === 'passed') progress.passed++;
                if (vm.selectedRun.tests[i].status === 'failed') progress.failed++;
            }

            return progress;
        }

        /**
         * change selected run index and recalculate progress object
         * @param id
         */
        function selectRun(id) {
            if (id !== vm.selectedRun._id) {
                for (var i = 0; i < vm.runs.length; i++) {
                    if (vm.runs[i]._id === id) {
                        vm.selectedRun = vm.runs[i];
                        break;
                    }

                }
                vm.progress = getProgress();
                vm.testClusters = clusterizeTests();
            }
        }

        /**
         * add and remove row indexes form array of selected runs by checkboxes
         * @param e - event object
         * @param i - index of run
         */
        function runCheckBoxClick(e, index) {
            e.stopPropagation();
            if (e.target.checked) {
                addSelectedRunId(e.target.value);
                checkSelectAll();
            }
            else {
                vm.selectedRuns.splice(vm.selectedRuns.indexOf(e.target.value), 1);
                vm.checkAllModel.checked = false;
            }
        }

        function checkSelectAll() {
            checkboxesOnView = getRunCheckboxesOnView();
            vm.checkAllModel.checked = true;
            for (var i = 0; i < checkboxesOnView.length; i++) {
                if (!checkboxesOnView[i].checked) {
                    vm.checkAllModel.checked = false;
                }
            }
        }

        /**
         * function for clusterization test cases in selected test run by their suite
         * @returns {*} array of clusters
         */
        function clusterizeTests() {
            if (vm.runs.length === 0) return;

            var tests = vm.selectedRun.tests;

            if (tests.length === 0) return [];

            tests = tests.sort(function (a, b) {
                return (a.suite <= b.suite ? 0 : 1);
            });
            var clusters = [[tests[0]]];

            for (var i = 1; i < tests.length; i++) {
                if (clusters[clusters.length - 1].length === 0 || tests[i].suite !== clusters[clusters.length - 1][0].suite) {  // jshint ignore:line
                    clusters[clusters.length] = [];
                }
                clusters[clusters.length - 1].push(tests[i]);
            }

            return clusters;

        }

    }
})();
