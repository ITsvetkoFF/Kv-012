/**
 * @ngdoc controller
 * @name runsController
 * @memberOf app.runs
 * @descripiton Controls runs view logic
 */


(function () {
    'use strict';

    angular
        .module('app.runs')
        .controller('RunsController', RunsController);

    RunsController.$inject = ['logger', 'FakeRunsFactory', 'moment'];

    function RunsController(logger, FakeRuns, moment) {

        var vm = this;
        vm.runs = FakeRuns(13, 10, 3);
        vm.moment = moment;
        vm.selectRun = selectRun;
        vm.selectedRuns = [];
        vm.selectedRun = 0;
        vm.progress = getProgress();
        vm.runCheckBoxClick = runCheckBoxClick;
        vm.testClusters = clusterizeTests();

        activate();

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
        function getProgress(){
            if(vm.runs.length === 0) return;

            var progress = {passed: 0, failed: 0, length: vm.runs[vm.selectedRun].tests.length};

            for(var i=0; i<vm.runs[vm.selectedRun].tests.length; i++){
                if(vm.runs[vm.selectedRun].tests[i].status === 'passed') progress.passed++;
                if(vm.runs[vm.selectedRun].tests[i].status === 'failed') progress.failed++;
            }

            return progress;
        }

        /**
         * change selected run index and recalculate progress object
         * @param index
         */
        function selectRun(index){
            if(index !== vm.selectedRun){
                vm.selectedRun = index;
                vm.progress = getProgress();
                vm.testClusters = clusterizeTests();
            }
        }

        /**
         * add and remove row indexes form array of selected runs by checkboxes
         * @param e - event object
         * @param i - index of run
         */
        function runCheckBoxClick(e, i){
            e.stopPropagation();
            if(e.target.checked) vm.selectedRuns.push(i);
            else vm.selectedRuns.splice(vm.selectedRuns.indexOf(i), 1);
        }

        /**
         * function for clusterization test cases in selected test run by their suite
         * @returns {*} array of clusters
         */
        function clusterizeTests(){
            if(vm.runs.length === 0) return;

            var tests = vm.runs[vm.selectedRun].tests;

            if(tests.length === 0) return [];

            tests = tests.sort(function(a, b){
                return (a.suite<=b.suite ? 0:1);
            });
            var clusters = [[tests[0]]];

            for(var i=1; i<tests.length; i++){
                if(clusters[clusters.length-1].length === 0 || tests[i].suite !== clusters[clusters.length-1][0].suite){
                    clusters[clusters.length] = [];
                }
                clusters[clusters.length-1].push(tests[i]);
            }

            return clusters;

        }
    }
})();
