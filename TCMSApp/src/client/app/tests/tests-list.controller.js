(function () {
    'use strict';

    angular
        .module('app.tests')
        .controller('TestsListController', TestsListController);

    TestsListController.$inject = ['logger', 'FakeTestsFactory', '$uibModal', 'TestsService'];
    /* @ngInject */
    function TestsListController(logger, FakeTestsFactory, $uibModal, TestsService) {
        var vm = this;

        activate();

        vm.checkedAllCases = false; // checkbox for testCases
        vm.openAddSuite = openAddSuite; // open modal for new suite
        vm.f = FakeTestsFactory(10); // f for faker, array of suites
        vm.currentSuite = vm.f[0]; 
        TestsService.setCurrentSuite(vm.currentSuite); 
        vm.compareObj = compareObj;
        vm.setSuite = setSuite;

        function activate() {
            logger.info('Activated Tests View');
        }

        function setSuite(suite) {
            vm.currentSuite = suite;
            TestsService.setCurrentSuite(vm.currentSuite);
            console.log(vm.currentSuite);
        }

        function compareObj(obj1, obj2) {
            return (obj1 == undefined || obj2 == undefined) ? false : (JSON.stringify(obj1) === JSON.stringify(obj2)); 
        }

        // modal
        function openAddSuite() {
            var modalWindow = $uibModal.open({
                templateUrl: 'newSuite.html',
                controller: function($uibModalInstance) {
                    var vmSuite = this;
                    vmSuite.cancel = cancel;
                    vmSuite.submit = submit;

                    function submit() {
                        var suite = {};
                        suite.suiteName = vmSuite.suiteName;
                        suite.suiteDescription = vmSuite.suiteDescription;
                        vm.f.push(suite);
                        $uibModalInstance.dismiss();
                    }

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                controllerAs: 'vmSuite'
            });
        };

    }

})();
