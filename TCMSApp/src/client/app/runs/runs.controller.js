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
        vm.runs = FakeRuns(23, 10, 3);
        vm.moment = moment;
        vm.selectRun = selectRun;
        vm.selectedRuns = [];
        vm.selectedRun = (vm.runs.length===0?null:vm.runs[0]);
        vm.progress = getProgress();
        vm.runCheckBoxClick = runCheckBoxClick;
        vm.testClusters = clusterizeTests();
        vm.filterFields = {"date": "date", "name": "name", "build": "build", "environment": "envShort", "env": "envShort",
            "author": "author", "status": "status", "envFull": "envFull", "env full": "envFull"};

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
            toStringOverloaders();
        }

        function toStringOverloaders(){
            for(var i=0; i<vm.runs.length; i++){
                vm.runs[i].author.toString = function(type){
                    if(type === 'short')
                        return this.last+' '+this.first.slice(0,1)+'.';
                    return this.last+' '+this.first;
                };

                var envFullProto = {
                    toString: function(){
                        var result = "";
                        var keys = Object.keys(this);
                        for(var i=0; i<keys.length; i++){
                            result += keys[i]+": "+this[keys[i]]+"; ";
                        }
                        return result;
                    }
                };

                vm.runs[i].envFull.__proto__ = envFullProto;
            }
        }

        /**
         * calculation number of passed and failed tests in selected run
         * @returns {{passed: number, failed: number, length: *}}
         */
        function getProgress(){
            if(vm.selectedRun === null) return;

            var progress = {passed: 0, failed: 0, length: vm.selectedRun.tests.length};

            for(var i=0; i<vm.selectedRun.tests.length; i++){
                if(vm.selectedRun.tests[i].status === 'passed') progress.passed++;
                if(vm.selectedRun.tests[i].status === 'failed') progress.failed++;
            }

            return progress;
        }

        /**
         * change selected run index and recalculate progress object
         * @param id
         */
        function selectRun(id){
            if(id !== vm.selectedRun._id){
                for(var i=0; i<vm.runs.length; i++){
                    if(vm.runs[i]._id === id) {
                        vm.selectedRun = vm.runs[i];
                        break;
                    }

                }
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

            var tests = vm.selectedRun.tests;

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
