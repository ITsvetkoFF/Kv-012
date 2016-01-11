(function () {
    'use strict';

    angular
        .module('app.tests')
        .controller('TestsListController', TestsListController);

    TestsListController.$inject = ['logger','$uibModal', 'TestsService'];
    /* @ngInject */
    function TestsListController(logger, $uibModal, TestsService) {
        var vm = this;

        activate();

        vm.checkedAllCases = false; // checkbox for testCases
        vm.openAddSuite = openAddSuite; // open modal for new suite
        vm.f = TestsService.getFakeSuites();// f for faker, array of suites
        vm.currentSuite = TestsService.getCurrentSuite(); // on upload we see first suite 
        vm.setSuite = setSuite;

        function activate() {
            logger.info('Activated Tests View');
        }

        function setSuite(suite) {
            vm.currentSuite = suite;
            TestsService.setCurrentSuite(vm.currentSuite);
        }

        // modal
        function openAddSuite() {
            var modalWindow = $uibModal.open({
                templateUrl: 'app/tests/add-suite-modal.html',
                controller: function($uibModalInstance) {
                    var vmSuite = this;
                    vmSuite.cancelAddSuite = cancelAddSuite;
                    vmSuite.submitAddSuite = submitAddSuite;

                    function submitAddSuite() {
                        var suite = {};
                        suite.suiteName = vmSuite.suiteName;
                        suite.suiteDescription = vmSuite.suiteDescription;
                        vm.f.push(suite);
                        $uibModalInstance.dismiss();
                    }

                    function cancelAddSuite() {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                controllerAs: 'vmSuite'
            });
        };

    }

})();
