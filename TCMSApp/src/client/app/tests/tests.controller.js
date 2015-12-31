(function () {
    'use strict';

    angular
        .module('app.tests')
        .controller('TestsController', TestsController);

    TestsController.$inject = ['logger', 'FakeTestsFactory', '$uibModal'];
    /* @ngInject */
    function TestsController(logger, FakeTestsFactory, $uibModal) {
        var vm = this;

        vm.stepList = [1,2];
        vm.addStep = addStep;
        vm.delStep = delStep;

        vm.trigger = 0; // suite -> testCases
        vm.checked = false; // checkbox for testCases
        vm.open = open; // open modal for new suite

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

        function addStep(){
            var stepCount = vm.stepList.length;
            vm.stepList.push(stepCount + 1);
        }

        function delStep($index) {
            vm.stepList.splice($index,1);
            console.log($index);
        }

        // modal
        function open() {
            var modalWindow = $uibModal.open({
                templateUrl: 'newSuite.html',
                controller: function($uibModalInstance) {
                    var vmSuite = this;
                    vmSuite.cancel = cancel;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                controllerAs: 'vmSuite'
            });
        };

    }

})();
