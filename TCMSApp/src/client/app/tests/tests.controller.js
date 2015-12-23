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

        vm.trigger = 0; // suite -> testCases

        var n = 10; // number of generated suites
        vm.f = []; // f for faker, array of suites

        var i;
        for (i = 0; i < n; i++) {
            var casesNumber = Math.floor(Math.random() * (20 - 7)) + 7;
            vm.f[i] = FakeTestsFactory.getTests(casesNumber);
            vm.f[i]._id = i+1;
        }
        activate();

        function activate() {
            logger.info('Activated Tests View');
        }

    }
})();
