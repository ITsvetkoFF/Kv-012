/* jshint -W117, -W030 */
describe('RunsController', function () {
    var controller, httpBackend;
    var user = mockData.getMockUser();
    var runData = mockData.getMockRun();
    var testCases = mockData.getMockTests();
    var clusters = mockData.getMockClusters();
    var progress = mockData.getMockProgress();

    beforeEach(function () {
        bard.appModule('app.runs');
        bard.inject('$controller', '$rootScope', '$httpBackend', 'apiUrl');
    });

    describe('RunsController', function () {

        beforeEach(function () {
            var scope = $rootScope.$new();
            controller = $controller('RunsController',
                {
                    $scope: scope
                });

            httpBackend = $httpBackend;
            httpBackend.when('GET', '/api/v1/User').respond(user);
            httpBackend.when('GET', '/api/v1/Projects/' + user.currentProjectID).respond({});
            httpBackend.when('GET', apiUrl.host + apiUrl.runs + '/?query={"project": "undefined"}&populate=author')
                .respond(runData);
            httpBackend.when('GET', apiUrl.host + apiUrl.runs + '/?populate=author').respond(runData);
            httpBackend.when('GET', apiUrl.host + apiUrl.runTests + '?query={"run" : "' + runData[0]._id + '"}')
                .respond(testCases);
            httpBackend.flush();
            $rootScope.$digest();
        });

        describe('RunsController', function () {
            it('should be created successfully', function () {
                expect(controller).to.be.defined;
            });
        });

        describe('After runs were loaded', function () {
            it('should receive test cases', function() {
                expect(JSON.stringify(controller.tests)).to.equal(JSON.stringify(testCases));
            });

            it('should calculate run progress', function () {
                expect(JSON.stringify(controller.progress)).to.equal(JSON.stringify(progress));
            });

            it('should create clusters from received data', function () {
                expect(JSON.stringify(controller.testClusters)).to.equal(JSON.stringify(clusters));
            });
        });

        describe('checkboxModel', function () {
            it('should create model for selectAllCheckbox with "checked" property', function () {
                expect(controller.checkAllModel).to.have.property('checked');
            });

            it('should set selectAllCheckbox.checked to false', function () {
                expect(controller.checkAllModel.checked).to.equals(false);
            });

            it('should create checkboxes models array with the same length as vm.runs', function () {
                expect(controller.checkboxesModels).to.have.length(controller.runs.length);
            });

            it('should fill checkboxesModel array with vm.runs[i]._id', function () {
                var _id = controller.runs[0]._id;
                var runId = controller.checkboxesModels[0].runId;
                expect(_id).to.equals(runId);
            });

            it('should return only 1 element with "checked" property', function () {
                var id = controller.runs[0]._id;
                expect(controller.setCheckboxModel(id)).to.have.property('checked');
            });

            it('should return only 1 element', function () {
                var id = controller.runs[0]._id;
                expect(controller.setCheckboxModel(id)).to.be.an('object');
            });
        });

        describe('vm.runs', function () {
            it('should create runs array', function () {
                expect(controller.runs).to.be.an('array');
            });

            it('should push 1 element to runs array from response', function () {
                expect(controller.runs.length).to.equals(1);
            });
        });

        describe('select all feature', function () {
            it('should switch vm.checkAllModel to checked = true', function () {
                var event = {target: {checked: true}};
                controller.selectAll(event);
                expect(controller.selectedRuns.length).to.equals(controller.runs.length);
            });

            it('should deselect all', function () {
                var event = {target: {checked: false}};
                controller.selectAll(event);
                expect(controller.selectedRuns.length).to.equals(0);
            });
        });

        describe('select run', function () {
            var event1, event2, event3, event4;

            beforeEach(function () {
                event1 = {
                    target: {
                        checked: true,
                        value: 1
                    },
                    stopPropagation: function () {
                    }
                };
                event2 = {
                    target: {
                        checked: false,
                        value: 1
                    },
                    stopPropagation: function () {
                    }
                };
                event3 = {
                    target: {
                        checked: true,
                        value: 1
                    },
                    stopPropagation: function () {
                    }
                };
                event4 = {
                    target: {
                        checked: true,
                        value: 2
                    },
                    stopPropagation: function () {
                    }
                };
            });

            it('should increase selected runs array by 1 element', function () {
                var initLength = controller.selectedRuns.length;
                controller.runCheckBoxClick(event1);
                expect(controller.selectedRuns.length).to.equals(initLength + 1);
            });

            it('should decrease selected runs array by 1 element', function () {
                controller.runCheckBoxClick(event1);
                var initLength = controller.selectedRuns.length;
                controller.runCheckBoxClick(event2);
                expect(controller.selectedRuns.length).to.equals(initLength - 1);
            });

            it('exists same runId in selected runs', function () {
                controller.runCheckBoxClick(event1);
                var initLength = controller.selectedRuns.length;
                controller.runCheckBoxClick(event3);
                var currLength = controller.selectedRuns.length;
                expect(initLength).to.equals(currLength);
            });

            it('not exists same runId in selected runs', function () {
                controller.runCheckBoxClick(event1);
                var initLength = controller.selectedRuns.length;
                controller.runCheckBoxClick(event4);
                var currLength = controller.selectedRuns.length;
                expect(initLength).to.not.equals(currLength);
            });
        });

        describe('delete feature', function () {
            it('should delete selected runs', function () {
                controller.selectedRuns.push(1);
                controller.selectedRuns.push(2);
                controller.deleteSelectedRuns();
                expect(controller.selectedRuns.length).to.equals(0);
            });
        });
    });
});
