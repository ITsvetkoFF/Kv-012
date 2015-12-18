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

    RunsController.$inject = ['logger', 'FakeRunsFactory'];

    function RunsController(logger, FakeRunsFactory) {

        var vm = this;
        vm.title = 'Admin';

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
    }
})();
