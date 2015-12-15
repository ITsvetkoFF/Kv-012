(function () {
    'use strict';

    angular
        .module('app.runs')
        .controller('RunsController', RunsController);

    RunsController.$inject = ['logger'];
    /* @ngInject */
    function RunsController(logger) {
        var vm = this;
        vm.title = 'Admin';

        activate();

        function activate() {
            logger.info('Activated Runs View');
        }
    }
})();
