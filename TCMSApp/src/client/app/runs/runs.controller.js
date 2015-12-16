(function () {
    'use strict';

    angular
        .module('app.runs')
        .controller('RunsController', RunsController);

    RunsController.$inject = ['logger', 'FakeRunsService'];
    /* @ngInject */
    /**
     * @memberOf app.runs
     * @ngdoc controller
     * @name RunsController
     * @param logger {factory}
     * @param FakeRunsService {service}
     * @constructor
     */
    function RunsController(logger, FakeRunsService) {

        /**
         * @memberOf RunsController
         * @type {app.runs}
         */
        var vm = this;
        /**
         * @memberOf RunsController
         * @type {string}
         * @description title of browser tab
         */
        vm.title = 'Admin';

        activate();

        /**
         * @memberOf RunsController
         * @function activate
         * @description set logger test and run logger
         */
        function activate() {
            logger.info('Activated Runs View');
        }

        console.log(FakeRunsService.getFakeRuns(1));
    }
})();
