(function () {
    'use strict';

    angular
        .module('app.tests')
        .controller('TestsListController', TestsListController);

    TestsListController.$inject = ['logger', '$uibModal', 'TestsService', 'filterFields'];
    /* @ngInject */
    function TestsListController(logger, $uibModal, TestsService, filterFields) {
        var vm = this;

        activate();

        vm.checkedAllCases = false; // checkbox for testCases
        vm.suites = [];  // fill view with test suites
        vm.getSuites = getSuites();
        vm.tests = []; // test cases of a current suite
        vm.stepList = [];
        vm.openAddSuite = openAddSuite; // open modal for new suite
        vm.currentSuite = {}; // on upload we see first suite
        vm.setSuite = setSuite;
        vm.filterFields = filterFields.tests.getFields();
        vm.createTests = createTests;

        function activate() {
            logger.info('Activated Tests View');
        }

        // fill suites array
        function getSuites() {
            var resource = TestsService.getSuites();
            resource.query({}, function (res) {
                vm.suites = res;
                vm.currentSuite = vm.suites[0];
                getTests();
            });
        }

        // function gets test cases of current suite
        function getTests() {
            var suiteID = vm.currentSuite._id;
            var resource = TestsService.getTestsOfSuite(suiteID);
            resource.query({}, function (res) {
                vm.tests = res;
            });
        }

        // function gets all steps of current test
        function getSteps(test) {
            var testID = test;
            var resource = TestsService.getStepsOfTest(testID);
            var stepList;
            resource.query({}, function (res) {
                stepList = res;
                return stepList;
            });
        }

        // function swithes current suite to selected one
        function setSuite(suite) {
            vm.currentSuite = suite;
            getTests();
        }

        function createTests() {
        }

        // modal
        function openAddSuite() {
            var modalWindow = $uibModal.open({
                templateUrl: 'app/tests/add-suite-modal.html',
                controller: function ($uibModalInstance) {
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
                    }

                },
                controllerAs: 'vmSuite'
            });
        }
    }
})();
