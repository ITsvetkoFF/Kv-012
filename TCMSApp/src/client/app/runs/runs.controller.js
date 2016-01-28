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

    RunsController.$inject = ['logger', 'FakeRunsFactory', 'filterFields', 'RunsApiService', '$q'];

    function RunsController(logger, fakeRuns, filterFields, RunsApiService, $q) {

        var vm = this;
        RunsApiService.getRuns.query().$promise.then(processData);

        function processData(result) {

            if (result.length === 0) {
                result = fakeRuns(100, 10, 3);
                result.forEach(function (data) {
                    RunsApiService.save(data);
                });

            }

            vm.runs = result;
            vm.selectRun = selectRun;
            vm.tests = [];
            vm.selectedRuns = [];
            vm.suiteNames = {};
            vm.selectedRun = (vm.runs.length === 0 ? null : vm.runs[0]);
            vm.getTestsOfRun = getTestsOfRun();
            vm.progress = getProgress();
            vm.runCheckBoxClick = runCheckBoxClick;
            vm.testClusters = clusterizeTests();
            vm.filterFields = filterFields.runs.getFields();

            activate();
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

            var progress = {passed: 0, failed: 0, length: vm.tests.length};

            for (var i = 0; i < vm.tests.length; i++) {
                if (vm.tests[i].status === 'passed') progress.passed++;
                if (vm.tests[i].status === 'failed') progress.failed++;
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
         * add and remove row indexes form array of selected runs by checkboxes
         * @param e - event object
         * @param i - index of run
         */
        function runCheckBoxClick(e, i) {
            e.stopPropagation();
            if (e.target.checked) vm.selectedRuns.push(i);
            else vm.selectedRuns.splice(vm.selectedRuns.indexOf(i), 1);
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
                return (a.suite <= b.suite ? 0 : 1);
            });
            var clusters = [[tests[0]]];

            for (var i = 1; i < tests.length; i++) {
                if (clusters[clusters.length - 1].length === 0 || tests[i].suite !== clusters[clusters.length - 1][0].suite) {  // jshint ignore:line
                    clusters[clusters.length] = [];
                }
                clusters[clusters.length - 1].push(tests[i]);
            }

            console.log(clusters);
            return clusters;

        }

        // gets all test cases of a current run
        function getTestsOfRun() {
            var deferred = $q.defer();
            var runID = vm.selectedRun._id;
            var resource = RunsApiService.getTestsOfRun(runID);
            resource.query({}, function (res) {
                vm.tests = res;
                vm.progress = getProgress();
                vm.testClusters = clusterizeTests();
                fillSuiteNames();
                deferred.resolve();
            });

            return deferred.promise;
        }

        // fills the dictionary of suite ID's and names
        function fillSuiteNames() {
            var suiteNames = {},
                tests = vm.tests,
                i, suiteID,
                l = tests.length;

            for (i = 0; i < l; i++) {
                suiteID = tests[i].suite;
                if (!vm.suiteNames[suiteID])
                    fillName(suiteID);
            }

            // make a request and fill suiteNames with a new name
            function fillName(id) {
                RunsApiService.getSuite(id).get({}, function (res) {
                    vm.suiteNames[id] = res.suiteName;
                });
            }

        }

    }
})();
