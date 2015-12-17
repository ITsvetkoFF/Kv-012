(function () {
    'use strict';

    angular
        .module('app.runs')
        .controller('RunsController', RunsController);

    RunsController.$inject = ['logger', 'FakeRunsService'];

    function RunsController(logger, FakeRunsService) {

        var vm = this;
        vm.title = 'Admin';

        activate();

        function activate() {
            logger.info('Activated Runs View');
        }

        console.log(FakeRunsService(1));


        // TODO: call FakeRunsService.getFakeRuns and implement view logic...
    }
})();
