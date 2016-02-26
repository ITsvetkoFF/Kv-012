/* jshint -W071 */

(function () {
    'use strict';

    angular
        .module('app.tests')
        .controller('TestsListController', TestsListController);

    TestsListController.$inject = ['logger', '$uibModal', 'TestsService', 'filterFields', '$scope', '$filter',
        '$state', 'RunsApiService', 'user', '$q'];
    /* @ngInject */
    function TestsListController(logger, $uibModal, TestsService, filterFields, $scope, $filter,
                                 $state, RunsApiService, user, $q) {
        var vm = this;

        activate();

        vm.checkedAllCases = false; // checkbox for testCases
        vm.suites = [];  // fill view with test suites
        vm.getSuites = getSuites();
        vm.tests = []; // test cases of all suites
        vm.stepList = [];
        vm.openAddSuite = openAddSuite; // open modal for new suite
        vm.currentSuite = {}; // on upload we see first suite
        vm.setSuite = setSuite;
        vm.filterFields = filterFields.tests.getFields();

        // data for checkboxes -------------------------------------

        vm.allTestsCheckboxModel = {checked: false, id: 'checkAllTestsCheckbox'};
        vm.newRunName = 'New Run';
        vm.filteredTests = [];
        vm.selectedTests = [];
        vm.testCheckboxesModels = [];
        vm.suiteCheckboxesModels = [];
        vm.testCheckboxClickHandler = testCheckboxClickHandler;
        vm.setTestCheckboxModel = setTestCheckboxModel;
        vm.checkAllTests = checkAllTests;
        vm.setSuiteCheckboxModel = setSuiteCheckboxModel;
        vm.runSelected = runSelectedTests;
        vm.checkSuiteTests = checkSuiteTests;
        vm.currentTests = [];

        // ---------------------------------------------------------

        function activate() {
            logger.info('Activated Tests View');
            _setFilterQueryWatcher();
        }

        // fill suites array
        function getSuites() {
            var resource = TestsService.getSuites();
            resource.query({}, function (res) {
                vm.suites = res;
                vm.currentSuite = vm.suites[0];
                vm.currentTests.length = 0;

                res.map(function (item, i, array) {
                    vm.suiteCheckboxesModels.push({
                        checked: false,
                        id: item._id
                    });
                });

                getTests(res);
            }, function (err) {
                logger.error(err.responseText);
            });
        }

        // function gets test cases of current suite
        function getTests(suites) {
            if (vm.currentSuite) {
                vm.tests.length = 0;

                suites.map(function (item, index, array) {
                    TestsService.getTestsOfSuite(item._id).query({},
                        function (res) {

                            res.map(function (test) {
                                vm.tests.push(test);
                            });

                            if (item._id === vm.currentSuite._id) {
                                _setCurrentTests();
                            }

                            _setTestCheckboxesModels(res);
                            _refreshFilteredTests();
                        }, function (err) {
                            logger.error(err.responseText);
                        });
                });
            }
        }

        // function swithes current suite to selected one
        function setSuite(suite) {
            vm.currentSuite = suite;
            vm.currentTests.length = 0;
            _setCurrentTests();
            _refreshFilteredTests();
        }

        // modal
        function openAddSuite(selectedSuite) {
            var modalWindow = $uibModal.open({
                templateUrl: 'app/tests/add-suite-modal.html',
                controller: function ($uibModalInstance) {
                    var vmSuite = this;

                    vmSuite.windowTitle = 'Create New Test Suite';
                    vmSuite.suiteName = '';
                    vmSuite.suiteDescription = '';
                    vmSuite.errorName = '';
                    vmSuite.cancelAddSuite = cancelAddSuite;
                    vmSuite.submitAddSuite = submitAddSuite;

                    if (selectedSuite) {
                        vmSuite.suiteName = selectedSuite.suiteName;
                        vmSuite.suiteDescription = selectedSuite.suiteDescription;
                        vmSuite.windowTitle = 'Edit ' + selectedSuite.suiteName;
                    }

                    function submitAddSuite() {
                        var Suite;

                        if (!selectedSuite) {
                            Suite = TestsService.getSuites();
                            var suite = new Suite();
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
                                    else {
                                        logger.error('Cannot create a suite.');
                                    }
                                }
                            );
                        } else {
                            Suite = RunsApiService.getSuite(selectedSuite._id).get(function () {
                                Suite.suiteName = vmSuite.suiteName;
                                Suite.suiteDescription = vmSuite.suiteDescription;
                                Suite.$save().then(
                                    function (res) {
                                        logger.success(vmSuite.suiteName + ' was updated.');
                                        getSuites();
                                        $uibModalInstance.dismiss();
                                    },
                                    function (err) {
                                        if (err.data.errors.project && err.data.errors.suiteName) {
                                            vmSuite.errorName = 'errorName';
                                            logger.error(err.data.errors.suiteName.message);
                                        }
                                        else {
                                            logger.error('Cannot update a suite.');
                                        }
                                    }
                                );
                            });
                        }

                    }

                    function cancelAddSuite() {
                        $uibModalInstance.dismiss('cancel');
                    }
                },
                controllerAs: 'vmSuite'
            });
        }

        function _setFilterQueryWatcher() {
            $scope.$watch('filterQuery', function (newVal, oldVal) {
                if (oldVal !== undefined) {
                    _refreshFilteredTests();
                }
            });
        }

        function _setCurrentTests() {
            vm.tests.map(function (item, i, array) {
                if (item.suite === vm.currentSuite._id) {
                    vm.currentTests.push(item);
                }
            });
        }

        function _refreshFilteredTests() {
            vm.filteredTests.length = 0;

            $filter('smartFilter')(vm.currentTests, $scope.filterQuery, vm.filterFields)
                .map(function (item, index, arr) {
                    vm.filteredTests.push(item);
                });

            if (vm.selectedTests.length) {
                _setCheckAllCheckbox();
            }
        }

        //functions for checkboxes -------------------------------------------------

        function _setIndeterminateById(id, value) {
            document.getElementById(id).indeterminate = value;
        }

        function _setCheckAllCheckbox() {

            var checkedTest = vm.filteredTests
                .filter(function (item) {
                    return vm.selectedTests[vm.selectedTests.indexOf(item._id)] === item._id;
                });

            if (checkedTest.length === 0) {
                _setIndeterminateById(vm.allTestsCheckboxModel.id, false);
                vm.allTestsCheckboxModel.checked = false;

            } else if (checkedTest.length === vm.filteredTests.length) {
                _setIndeterminateById(vm.allTestsCheckboxModel.id, false);
                vm.allTestsCheckboxModel.checked = true;

            } else if (checkedTest.length < vm.filteredTests.length) {
                _setIndeterminateById(vm.allTestsCheckboxModel.id, true);
                vm.allTestsCheckboxModel.checked = false;
            }
        }

        function _setSuiteCheckbox() {
            var checkedTests = vm.currentTests
                .filter(function (item, i, array) {
                    return item._id === vm.selectedTests[vm.selectedTests.indexOf(item._id)];
                });

            if (checkedTests.length === 0) {
                _setIndeterminateById(vm.currentSuite._id, false);
                _getSuiteModelById(vm.currentSuite._id).checked = false;

            } else if (checkedTests.length === vm.currentTests.length) {
                _setIndeterminateById(vm.currentSuite._id, false);
                _getSuiteModelById(vm.currentSuite._id).checked = true;

            } else if (checkedTests.length < vm.currentTests.length) {
                _setIndeterminateById(vm.currentSuite._id, true);
                _getSuiteModelById(vm.currentSuite._id).checked = false;
            }
        }

        function _getSuiteModelById(id) {
            return vm.suiteCheckboxesModels.filter(function (item, i, array) {
                return item.id === id;
            })[0];
        }

        function setSuiteCheckboxModel(id) {
            return vm.suiteCheckboxesModels
                .filter(function (item) {
                    return id === item.id;
                })[0];
        }

        function testCheckboxClickHandler($event) {

            if ($event.target.checked) {
                _selectTest($event.target.value);
            } else {
                _deselectTest($event.target.value);
            }

            _setCheckAllCheckbox();
            _setSuiteCheckbox();
        }

        function _selectTest(id) {
            var testExist = vm.selectedTests.filter(function (item, i, array) {
                return id === item;
            })[0];

            if (!testExist) {
                vm.selectedTests.push(id);
            }
        }

        function _deselectTest(id) {
            var index;
            var deleted = vm.selectedTests.map(function (item, i, array) {
                if (id === item) {
                    index = i;
                }
            })[0];
            if (index !== undefined) {
                vm.selectedTests.splice(index, 1);
            }
        }

        function _setTestCheckboxesModels(res) {

            if (vm.testCheckboxesModels.length === 0) {
                res.map(function (resTest) {
                    vm.testCheckboxesModels.push(
                        {
                            checked: false,
                            id: resTest._id
                        }
                    );
                });
            } else {
                res.map(function (resTest, i, array) {

                    var existingModel = vm.testCheckboxesModels.filter(function (item, i, array) {
                        return resTest._id === item.id;
                    })[0];

                    if (!existingModel) {
                        vm.testCheckboxesModels.push(
                            {
                                checked: false,
                                id: resTest._id
                            }
                        );
                    }
                });
            }
        }

        function setTestCheckboxModel(id) {
            return vm.testCheckboxesModels.filter(function (item, i, array) {
                return id === item.id;
            })[0];
        }

        function checkAllTests($event) {

            $event.target.checked ? _setTestsToCheck(true) : _setTestsToCheck(false); // jshint ignore:line

            function _setTestsToCheck(bool) {
                vm.filteredTests
                    .map(function (fTest, i, arr) {
                        vm.testCheckboxesModels
                            .filter(function (model, i, array) {
                                return fTest._id === model.id;
                            })
                            .map(function (model) {
                                if (bool) {
                                    _selectTest(model.id);
                                } else {
                                    _deselectTest(model.id);
                                }
                                model.checked = bool;
                            });
                    });
            }

            _setSuiteCheckbox();
        }

        function checkSuiteTests($event) {
            $event.stopPropagation();

            $event.target.checked ? _setTestsToCheck(true) : _setTestsToCheck(false); // jshint ignore:line

            function _setTestsToCheck(bool) {
                vm.tests
                    .filter(function (item) {
                        return item.suite === $event.target.value;
                    })
                    .map(function (test, i, arr) {
                        vm.testCheckboxesModels
                            .filter(function (model, i, array) {
                                return test._id === model.id;
                            })
                            .map(function (model) {
                                if (bool) {
                                    _selectTest(model.id);
                                } else {
                                    _deselectTest(model.id);
                                }
                                model.checked = bool;
                            });
                    });
            }

            _setCheckAllCheckbox();
        }

        function runSelectedTests() {
            var TestCaseCreator = RunsApiService.getTestsOfRunResource();
            var RunCreator = RunsApiService.getRunResource();
            var newRun = new RunCreator();

            var testsToGo = vm.tests.filter(function (item) {
                return item._id === vm.selectedTests[vm.selectedTests.indexOf(item._id)];
            });

            testsToGo.map(function (test) {
                test.status = 'pending';
                vm.suites.map(function (suite) {
                    if (test.suite === suite._id) {
                        test.suite = suite.suiteName;
                    }
                });
                test.steps.map(function(step) {
                    step.status = 'pending';
                });
            });

            newRun.name =  vm.newRunName;
            newRun.author = user.id;
            newRun.project = user.currentProjectID;
            newRun.$save(function (newRun) {

                for (var i = 0; i < testsToGo.length; i++) {
                    var newTest = new TestCaseCreator();
                    newTest.run = newRun._id;
                    newTest.testName = testsToGo[i].testName;
                    newTest.testDescription = testsToGo[i].testDescription;
                    newTest.automated = testsToGo[i].automated;
                    newTest.preConditions = testsToGo[i].preConditions;
                    newTest.suite = testsToGo[i].suite;
                    newTest.status = testsToGo[i].status;
                    newTest.steps = testsToGo[i].steps;
                    newTest.$save();
                }

                $state.go('runs-edit', {
                    id: newRun._id
                });
            }, function (err) {
                logger.error(err.responseText);
            });
        }
    }

})();
