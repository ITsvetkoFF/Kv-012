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
        vm.title = 'Admin';
        vm.runs = FakeRuns(13, 10, 3);
        vm.moment = moment;
        vm.selectRun = selectRun;
        vm.selectedRuns = [];
        vm.selectedRun = 0;
        vm.progress = getProgress();
        vm.runCheckBoxClick = runCheckBoxClick;

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
            vm.selectedRun = index;
            vm.progress = getProgress(index);
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
    }
})();
