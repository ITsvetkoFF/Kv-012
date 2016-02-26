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

    RunsController.$inject = ['$scope', 'logger', 'dataWrapper',
        'filterFields', 'RunsApiService', 'moment', '$document', '$filter', '$q'];

    function RunsController($scope, logger, dataWrapper, filterFields, RunsApiService, moment, $document,
                            $filter, $q) {

        var vm = this;
        RunsApiService.getRuns().query().$promise.then(processData);

        vm.checkAllModel = {checked: false};
        vm.setCheckboxModel = setCheckboxModel;
        vm.selectAll = selectAll;
        vm.checkSelectAll = checkSelectAll;
        vm.filteredRuns = [];
        vm.deleteSelectedRuns = deleteSelectedRuns;

        getData();

        function getData() {
            RunsApiService.getRuns().query().$promise.then(processData);
        }

        function processData(result) {

            vm.runs = dataWrapper.wrapRuns(result);
            vm.checkboxesModels = [];
            vm.selectRun = selectRun;
            vm.tests = [];
            vm.selectedRuns = [];
            vm.suiteNames = {};
            vm.progress = {};
            vm.testClusters = [];
            vm.selectedRun = (vm.runs.length === 0 ? null : vm.runs[0]);
            vm.getTestsOfRun = getTestsOfRun();
            vm.runCheckBoxClick = runCheckBoxClick;
            vm.filterFields = filterFields.runs.getFields();

            fillCheckboxesModels();
            refreshFilteredRuns();
            setSmartFilterQueryWatcher();
            checkSelectAll();

            activate();
        }

        /**
         * Refresh vm.filtered runs according to filter query in View
         * @memberOf app.runs
         */
        function refreshFilteredRuns() {
            vm.filteredRuns.length = 0;
            $filter('smartFilter')(vm.runs, $scope.filterQuery, vm.filterFields).map(function (run) {
                vm.filteredRuns.push(run);
            });
        }

        /**
         * Defines handler for filterQuery changing
         * @memberOf app.runs
         */
        function setSmartFilterQueryWatcher() {
            $scope.$watch('filterQuery', function (newVal, oldVal) {
                refreshFilteredRuns();
                if (oldVal !== undefined) {
                    checkSelectAll();
                }
            });
        }

        /**
         * fills vm.checkboxesModels array according to vm.runs
         * @memberOf app.runs
         */
        function fillCheckboxesModels() {
            vm.runs.map(function (run) {
                vm.checkboxesModels.push({
                    checked: false,
                    runId: run._id
                });
            });
        }

        /**
         * Returns only one model from vm.checkboxesModels
         * @memberOf app.runs
         * @param runId
         * @returns {T|*}
         */
        function setCheckboxModel(runId) {
            return vm.checkboxesModels.filter(function (model) {
                return model.runId === runId;
            })[0];
        }

        /**
         * Handler for selectAll checkbox.
         * Sets or unsets the 'checked' property of vm.checkboxesModels according to current view.
         * @memberOf app.runs
         * @param event
         */
        function selectAll(event) {
            if (event.target.checked) {
                vm.filteredRuns.map(function (fRun) {
                    vm.checkboxesModels.map(function (model) {
                        if (fRun._id === model.runId) {
                            model.checked = true;
                            addSelectedRunId(model.runId);
                        }
                    });
                });
            } else {
                vm.filteredRuns.map(function (fRun) {
                    vm.checkboxesModels.map(function (model) {
                        if (fRun._id === model.runId) {
                            model.checked = false;
                            vm.selectedRuns.splice(vm.selectedRuns.indexOf(model.runId), 1);
                        }
                    });
                });
            }
        }

        /**
         * See if value (runId) is already in the vm.selectedRuns and if not push runId to vm.selectedRuns
         * @memberOf app.runs
         * @param runId
         */
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
            if (vm.selectedRun === null || !vm.tests) return;

            var progress = {passed: 0, failed: 0, pending: 0, length: vm.tests.length};

            for (var i = 0; i < vm.tests.length; i++) {
                if (vm.tests[i].status === 'passed') progress.passed++;
                if (vm.tests[i].status === 'failed') progress.failed++;
                if (vm.tests[i].status === 'pending') progress.pending++;
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
                getTestsOfRun();
            }
        }

        /**
         * adds/removes selected runs to/from vm.selectedRuns and checks if all rows are checked
         * @memberOf app.runs
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

        /**
         * set to unchecked 'selectAllCheckbox' if even one of vm.filteredRuns is not in vm.selectedRuns
         * @memberOf app.runs
         */
        function checkSelectAll() {
            vm.checkAllModel.checked = true;
            vm.filteredRuns.map(function (fRun) {
                var temp = vm.selectedRuns.filter(function (sRun) {
                    return sRun === fRun._id;
                });
                if (temp.length === 0) {
                    vm.checkAllModel.checked = false;
                }
            });
        }

        /**
         * function for clusterization test cases in selected test run by their suite
         * @returns {*} array of clusters
         */
        function clusterizeTests() {
            if (vm.runs.length === 0) return;

            var tests = vm.tests;

            if (!tests) return [];

            tests = tests.sort(function (a, b) {
                return (a.suite <= b.suite ? -1 : 1);
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

        // gets all test cases of a current run
        function getTestsOfRun() {
            var deferred = $q.defer();
            var runID = vm.selectedRun._id;
            var resource = RunsApiService.getTestsOfRunResource(runID);
            resource.query({}, function (res) {
                vm.tests = res;
                vm.progress = getProgress();
                vm.testClusters = clusterizeTests();
                deferred.resolve();
            });

            return deferred.promise;
        }

        function deleteSelectedRuns() {
            vm.selectedRuns.forEach(function (sRun, index, sRuns) {
                RunsApiService.getRuns().remove({id: sRun}).$promise
                    .then(function (res) {
                        getData();
                    }, function (err) {

                    });
            });
            vm.selectedRuns.length = 0;
        }
    }
})();
