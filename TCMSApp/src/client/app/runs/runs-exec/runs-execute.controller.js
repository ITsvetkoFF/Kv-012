(function () {
    'use strict';

    angular
        .module('app.runsExec')
        .controller('RunsExecuteController', RunsExecuteController);

    RunsExecuteController.$inject = ['$stateParams','logger','moment'];

    function RunsExecuteController($stateParams) {

        var vm = this;
        //TODO: change this temporary solution of exchanging run data between edit and run tabs
        vm.run = JSON.parse(JSON.stringify($stateParams.run));//creating of the deep copy
        vm.progress = getProgress();
        vm.suites = getSuites();
        vm.selectedSuite = vm.suites[0];
        vm.selectedTest = vm.run.tests[0];

        function getProgress() {

            var numberOfTests = vm.run.tests.length;
            var progress = {passed: 0, failed: 0, length: numberOfTests};

            for (var i = 0; i < numberOfTests; i++) {
                if (vm.run.tests[i].status === 'passed') progress.passed++;
                if (vm.run.tests[i].status === 'failed') progress.failed++;
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
    }

})();
