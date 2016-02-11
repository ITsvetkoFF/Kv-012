/* jshint -W117, -W030 */
describe('Tests Create Controller', function () {

    var controller;

    beforeEach(function () {
        bard.appModule('app.tests', 'ngResource');
        bard.inject('$controller', '$log', '$q', '$rootScope', 'dataservice', '$httpBackend', 'apiUrl');
    });

    beforeEach(function () {
        var scope = $rootScope.$new();
        controller = $controller('TestsCreateController', {$scope: scope});

        $httpBackend.when('GET', '/api/v1/User').respond();
        $httpBackend.flush();
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Tests Create Controller', function () {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function () {

            it('should have title of Create Test Case', function () {
                expect(controller.title).to.equal('Create Test Case');
            });

            it('should have logged "Activated"', function () {
                expect($log.info.logs).to.match(/Activated/);
            });

            it('should add test step', function () {
                var steps = controller.steps.length;
                controller.addStep();
                var newSteps = controller.steps.length;
                expect(steps + 1).to.equal(newSteps);
            });

            it('should delete step', function () {
                controller.addStep();
                controller.addStep();
                var steps = controller.steps.length;
                controller.delStep(steps - 1);
                var newSteps = controller.steps.length;
                expect(steps - 1).to.equal(newSteps);
            });

            it('should check if steps are empty', function () {
                controller.addStep();
                expect(controller.stepsEmpty()).to.equal(true);
            });

            it('should check if steps are not empty', function () {
                controller.steps = [];
                controller.addStep();
                controller.steps[0].stepDescription = 'not empty';
                controller.steps[0].expectedResult = 'not empty';
                expect(controller.stepsEmpty()).to.equal(false);
            });

            it('should submit adding case', function () {

            });

        });
    });
});
