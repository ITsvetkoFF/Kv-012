/* jshint -W117, -W030 */
describe('ShellController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.layout');
        bard.inject('$controller', '$q', '$rootScope', '$timeout', 'dataservice');
    });

    beforeEach(function () {
        var scope = $rootScope.$new();
        controller = $controller('ShellController', {$scope:scope});
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Shell controller', function() {
        xit('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        xit('should show splash screen', function () {
            expect($rootScope.showSplash).to.be.true;
        });

        xit('should hide splash screen after timeout', function (done) {
            $timeout(function() {
                expect($rootScope.showSplash).to.be.false;
                done();
            }, 1000);
            $timeout.flush();
        });
    });
});
