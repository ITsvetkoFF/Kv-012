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

        var vm = this;
        vm.title = 'Admin';

        activate();

        function activate() {
            logger.info('Activated Runs View');
        }

        // TODO: call FakeRunsService.getFakeRuns and implement view logic...
    }
})();
