(function() {
    'use strict';

    angular
        .module('app.runsExec')
        .controller('RunsEditController', RunsEditController);

    RunsEditController.$inject = ['$stateParams', 'logger', 'moment'];

    function RunsEditController($stateParams) {
        var vm = this;
        //TODO: change this temporary solution of exchanging run data between edit and run tabs
        vm.run = JSON.parse(JSON.stringify($stateParams.run));//creating of the deep copy
        vm.addEnvDetail = addEnvDetail;

        function addEnvDetail (param, value) {

            vm.run.envFull[param] = value;

        }

    }
})();
