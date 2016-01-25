(function() {
    'use strict';

    angular
        .module('app.runsExec')
        .controller('RunsEditController', RunsEditController);

    RunsEditController.$inject = ['$stateParams', '$state', 'RunsApiService', 'logger', 'moment'];

    function RunsEditController($stateParams, $state, RunsApiService) {
        var vm = this;
        vm.addEnvDetail = addEnvDetail;

        activate();

        function activate() {

            if ($stateParams.run === undefined) {
                RunsApiService.get({id: $stateParams.id}).$promise.then(processData, processError);
            }
            else
            {
                processData($stateParams.run);
            }

        }

        function processData(result) {
            //TODO: change this temporary solution of exchanging run data between edit and run tabs
            vm.run = JSON.parse(JSON.stringify(result));//creating of the deep copy

        }

        //we will redirect user to run creation if the db connection fails etc
        function processError(error) {
            vm.run = {};//creating of the new test run
            vm.run.envFull = {};

        }

        function addEnvDetail ($event, param, value) {

            //for 'enter' keyCode = 13 (or 10 in FireFox)
            if ((($event.keyCode === 13) || ($event.keyCode === 10)) && (param) && (value)) {
                vm.run.envFull[param] = value;
                vm.param = undefined;
                vm.value = undefined;
            }

        }

    }
})();
