// /* jshint -W117, -W030 */
// describe('ShellController', function() {
//     var controller;

//     beforeEach(function() {
//         module('app.layout');
//         inject('$controller', '$rootScope', '$timeout');
//         controller = $controller('ShellController');
//         $rootScope.$apply();
//     });

//     bard.verifyNoOutstandingHttpRequests();

//     describe('Shell controller', function() {
//         it('should be created successfully', function () {
//             expect(controller).to.be.defined;
//         });

//         it('should show splash screen', function () {
//             expect($rootScope.showSplash).to.be.true;
//         });

//         it('should hide splash screen after timeout', function (done) {
//             $timeout(function() {
//                 expect($rootScope.showSplash).to.be.false;
//                 done();
//             }, 1000);
//             $timeout.flush();
//         });

//         it('should have sidebar set up as visible', function () {
//             expect(controller.sidebar.visible).to.be.true;
//         });

//         it('should have sidebar toggle function', function () {
//             controller.sidebar.sidebarToggle(true);
//             expect(controller.sidebar.visible).to.be.false;
//         });

//     });
// });
