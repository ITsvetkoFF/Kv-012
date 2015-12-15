(function () {
    'use strict';

    angular
        .module('app.reports')
        .controller('ReportsController', ReportsController);

    ReportsController.$inject = ['logger'];
    /* @ngInject */
    function ReportsController(logger) {
        var vm = this;
        vm.title = 'Admin';

        activate();

        function activate() {
            logger.info('Activated Reports View');
        }
    }
})();
