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

        function activate() {
            logger.info('Activated Runs View');
        }
    }
})();
