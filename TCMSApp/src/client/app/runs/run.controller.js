/**
 * @ngdoc controller
 * @name runController
 * @memberOf app.runs
 * @description Controls current run view
 */

(function() {
    'use strict';

    angular
        .module('app.runs')
        .controller('RunController', RunController);

    RunController.$inject = ["logger", "$state"];

    function RunController(logger, $state) {

        var vm = this;

        // object that contains details of current run
        vm.run = {
            runId: 1,
            info: "info about current run"
        };

        // name of current state, that will be sent as previous state for "Add defect" modal window
        // should be used by any controller that uses "Add defect" modal
        vm.previousState = $state.$current.name;

        activate();

        function activate() {
            logger.info("Activated run execute view!");
        }

    }
})();
