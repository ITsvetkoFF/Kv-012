(function () {
    'use strict';

    angular
        .module('app.tests')
        .controller('TestsController', TestsController);

    TestsController.$inject = ['logger'];
    /* @ngInject */
    function TestsController(logger) {
        var vm = this;
        vm.title = 'Admin';

        activate();

        function activate() {
            logger.info('Activated Tests View');
        }
    }
})();
