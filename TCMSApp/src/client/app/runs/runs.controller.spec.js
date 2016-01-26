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
            httpBackend.when('GET', 'http://localhost:3000/api/v1/Runs').respond([{
                name: 'run',
                tests: [
                    {
                        name: 'test'
                    }
                ]
            }]);
            httpBackend.when('POST', 'http://localhost:3000/api/v1/Runs').respond();
            httpBackend.when('DELETE', 'http://localhost:3000/api/v1/Runs').respond();
        });

        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        it('should push index of clicked run', function () {
            var eventStubTrue = {
                stopPropagation: function () {
                },
                target: {
                    checked: true
                }
            };
            controller.runCheckBoxClick(eventStubTrue, 0);
            expect(controller.selectedRuns).to.have.length(1);
        });

        it('should not push index of clicked run', function () {
            var eventStubTrue = {
                stopPropagation: function () {
                },
                target: {
                    checked: false
                }
            };
            controller.runCheckBoxClick(eventStubTrue, 0);

            expect(controller.selectedRuns).to.have.length(0);
            httpBackend.flush();
        });

        it('should select run', function () {
            controller.selectedRuns.push(0);
            expect(controller.selectedRuns).to.have.length(1);
            httpBackend.flush();
        });

        it('should clear vm.selectedRunsArray', function () {
            controller.deleteSelectedRuns();
            expect(controller.selectedRuns).to.have.length(0);
            httpBackend.flush();
        });

        it('generates a proper number of runs', function () {
            var result = [];
            controller.processData(result);
            expect(controller.runs.length).to.be.at.most(100);
            httpBackend.flush();
        });

        it('delete proper number of selected runs', function () {
            controller.processData([]);
            var firstRuns = controller.runs.length;
            controller.selectedRuns.push(0);
            controller.selectedRuns.push(1);
            var selectedLength = controller.selectedRuns.length;
            controller.deleteSelectedRuns();
            expect(firstRuns).to.equals(controller.runs.length + selectedLength);
            httpBackend.flush();
        });
    });
});
