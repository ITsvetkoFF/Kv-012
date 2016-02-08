/* jshint -W117, -W030 */
describe('DashboardController', function() {
    var controller, log;

    beforeEach(function () {
        bard.appModule('app.dashboard');
        bard.inject('$q', 'logger', '$http', 'apiUrl');
    });

    describe('Dashboard controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });
    });
});
