(function () {
    'use strict';

    angular
        .module('app.tests')
        .controller('TestsListController', TestsListController);

    TestsListController.$inject = ['logger', '$uibModal', 'TestsService', 'filterFields', 'user'];
    /* @ngInject */
    function TestsListController(logger, $uibModal, TestsService, filterFields, user) {
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
            if (vm.currentSuite) {
                var suiteID = vm.currentSuite._id;
                var resource = TestsService.getTestsOfSuite(suiteID);
                resource.query({}, function (res) {
                    vm.tests = res;
                });
            }
        }

        // function gets all steps of current test
        function getSteps(test) {
            var resource = TestsService.getStepsOfTest(test);
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

        // modal
        function openAddSuite() {
            var modalWindow = $uibModal.open({
                templateUrl: 'app/tests/add-suite-modal.html',
                controller: function ($uibModalInstance) {
                    var vmSuite = this;

                    vmSuite.suiteName = '';
                    vmSuite.suiteDescription = '';
                    vmSuite.errorName = '';
                    vmSuite.cancelAddSuite = cancelAddSuite;
                    vmSuite.submitAddSuite = submitAddSuite;

                    function submitAddSuite() {
                        var Suite = TestsService.getSuites(),
                            suite = new Suite();
                        suite.suiteName = vmSuite.suiteName;
                        suite.suiteDescription = vmSuite.suiteDescription;
                        suite.project = user.currentProjectID;
                        suite.$save().then(
                            function (res) {
                                logger.success('New Suite created');
                                getSuites();
                                $uibModalInstance.dismiss();
                            },
                            function (err) {
                                if (err.data.errors.project && err.data.errors.suiteName) {
                                    vmSuite.errorName = 'errorName';
                                    logger.error(err.data.errors.suiteName.message);
                                }
                                else logger.error('Cannot create a suite.');
                            }
                        );
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
