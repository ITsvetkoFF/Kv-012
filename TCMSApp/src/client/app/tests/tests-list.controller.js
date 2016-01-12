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
        vm.category = TestsService.getCategory();
        vm.priority = TestsService.getPriority();
        vm.sprint = TestsService.getSprint();
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

                    var lastSuite = vm.f[vm.f.length - 1];
                    vmSuite._id = lastSuite._id + 1;
                    vmSuite.priority = TestsService.getPriority();
                    vmSuite.suitePriority = '2';
                    vmSuite.cancelAddSuite = cancelAddSuite;
                    vmSuite.submitAddSuite = submitAddSuite;

                    function submitAddSuite() {
                        var suite = {};
                        suite.suiteName = vmSuite.suiteName;
                        suite._id = vmSuite._id;
                        suite.suiteDescription = vmSuite.suiteDescription;
                        suite.suitePriority = vmSuite.suitePriority;
                        suite.tests = [];
                        vm.f.push(suite);
                        vm.currentSuite = suite;
                        TestsService.setCurrentSuite(vm.currentSuite);
                        logger.success('New Suite created');
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
