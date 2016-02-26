(function () {
    'use strict';

    angular
        .module('app.runsExec')
        .controller('RunsEditController', RunsEditController);

    RunsEditController.$inject = ['$stateParams', '$state', 'RunsApiService', 'logger', 'moment', '$http'];

    function RunsEditController($stateParams, $state, RunsApiService, logger, moment, $http) {
        var vm = this;
        vm.addEnvDetail = addEnvDetail;
        vm.executeRun = executeRun;

        activate();

        function activate () {
            if (!RunsApiService.currentRun()) {
                RunsApiService.getRuns().get({id: $stateParams.id}).$promise.then(processData, processError);
            } else {
                processData(RunsApiService.currentRun());
            }
        }

        function processData(result) {
            //TODO: change this temporary solution of exchanging run data between edit and run tabs
            vm.run = result;
            vm.run.status = 'new';
            vm.run.intervalOfExecution = 0;
            if (!vm.run.envFull) {
                vm.run.envFull = {};
            }

        }

        //we will redirect user to run creation if the db connection fails etc
        function processError(error) {
            vm.run = {};//creating of the new test run
            vm.run.envFull = {};
        }

        function addEnvDetail($event, param, value) {

            //for 'enter' keyCode = 13 (or 10 in FireFox)
            if ((($event.keyCode === 13) || ($event.keyCode === 10)) && (param) && (value)) {
                vm.run.envFull[param] = value;
                vm.param = undefined;
                vm.value = undefined;
            }

        }

        function executeRun() {
            RunsApiService.getTestsOfRunResource(vm.run._id).query().$promise
                .then(function (tests) {
                    vm.run.tests = JSON.parse(JSON.stringify(tests));

                    var i = vm.run.tests.length;
                    while (i--) {
                        vm.run.tests[i].status = 'pending';

                        vm.run.tests[i].steps.forEach(function(step) {
                            step.status = 'pending';
                        });
                    }

                    RunsApiService.getRuns().get({id: $stateParams.id}).$promise.then(function(result) {
                        result.build = vm.run.build;
                        result.envShort = vm.run.envShort;
                        result.envFull = vm.run.envFull;
                        result.status = 'new';
                        result.intervalOfExecution = vm.run.intervalOfExecution;
                        result.$save();

                        RunsApiService.currentRun(vm.run);

                        $state.go('runs-execute', {
                            id: $stateParams.id
                        });
                    });
                });

        }

    }
})();
