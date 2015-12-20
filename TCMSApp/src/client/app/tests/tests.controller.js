(function () {
    'use strict';

    angular
        .module('app.tests')
        .controller('TestsController', TestsController);

    TestsController.$inject = ['logger', 'FakeTestsFactory'];
    /* @ngInject */
    function TestsController(logger, FakeTestsFactory) {
        var vm = this;
        vm.title = 'Admin';

        vm.f = FakeTestsFactory.getTests(10);

        activate();

        function activate() {
            logger.info('Activated Tests View');
        }
    }
})();
