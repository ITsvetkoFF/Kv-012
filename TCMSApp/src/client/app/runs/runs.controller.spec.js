/* jshint -W117, -W030 */
describe('RunsController', function () {
    var controller, httpBackend;

    beforeEach(function () {
        bard.appModule('app.runs');
        bard.inject('$controller', '$rootScope', '$httpBackend');
    });

    describe('RunsController', function () {

        beforeEach(function () {
            var scope = $rootScope.$new();
            controller = $controller('RunsController',
                {
                    $scope: scope
                });

            httpBackend = $httpBackend;

            httpBackend.when('GET', 'http://localhost:3000/api/v1/Runs').respond(
                [
                    {
                        _id: '56a94aa979ce40fc0d3e3389',
                        name: 'jdhcbdjcsd',
                        author: {
                            firstName: 'Yaroslav',
                            lastName: 'Dobroskok'
                        },
                        build: 111,
                        envShort: 'AAAAAA',
                        envFull: {
                            key2: 'val2',
                            key1: 'val1'
                        },
                        project: '569660e391b0bc1a28003311',
                        status: 'new',
                        dateStart: '2016-01-27T22:54:33.938Z',
                        __v: 0
                    }
                ]
            );
            httpBackend.when('GET', 'http://localhost:3000/api/v1/runTests?query={"run" : "56a94aa979ce40fc0d3e3389"}')
                .respond(
                [
                    {}
                ]
            );
            httpBackend.when('GET', 'http://localhost:3000/api/v1/Suites/undefined').respond(
                {}
            );
            httpBackend.flush();
            $rootScope.$digest();
        });

        it('should be created successfully', function () {
            expect(controller).to.be.defined;
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

        describe('select run', function() {
            var event1, event2, event3, event4;

            beforeEach(function() {
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

            it('exists same runId in selected runs', function() {
                controller.runCheckBoxClick(event1);
                var initLength = controller.selectedRuns.length;
                controller.runCheckBoxClick(event3);
                var currLength = controller.selectedRuns.length;
                expect(initLength).to.equals(currLength);
            });

            it('not exists same runId in selected runs', function() {
                controller.runCheckBoxClick(event1);
                var initLength = controller.selectedRuns.length;
                controller.runCheckBoxClick(event4);
                var currLength = controller.selectedRuns.length;
                expect(initLength).to.not.equals(currLength);
            });
        });

        describe('delete feature', function() {
            it('should delete selected runs', function() {
                controller.selectedRuns.push(1);
                controller.selectedRuns.push(2);
                controller.deleteSelectedRuns();
                expect(controller.selectedRuns.length).to.equals(0);
            });
        });
    });
});
