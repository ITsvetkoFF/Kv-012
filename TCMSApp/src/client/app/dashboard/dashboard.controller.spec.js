/* jshint -W117, -W030 */
describe('DashboardController', function() {
    var controller;
    var people = mockData.getMockPeople();

    beforeEach(function() {
        bard.appModule('app.dashboard');
        bard.inject('$controller', '$log', '$q', '$rootScope', 'dataservice');
    });

    beforeEach(function () {
        var scope = $rootScope.$new();
        sinon.stub(dataservice, 'getPeople').returns($q.when(people));
        controller = $controller('DashboardController', {$scope:scope});
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Dashboard controller', function() {
        xit('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            xit('should have title of Dashboard', function () {
                expect(controller.title).to.equal('Dashboard');
            });

            xit('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });

            xit('should have news', function () {
                expect(controller.news).to.not.be.empty;
            });

            xit('should have at least 1 person', function () {
                expect(controller.people).to.have.length.above(0);
            });

            xit('should have people count of 5', function () {
                expect(controller.people).to.have.length(7);
            });
        });
    });
});
