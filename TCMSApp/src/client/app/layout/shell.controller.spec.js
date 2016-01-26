// /* jshint -W117, -W030 */
// describe('ShellController', function() {
//     var _$controller;

//     beforeEach(function() {
//         bard.appModule('app.layout');
//         bard.inject('$controller', '$q', '$rootScope', '$timeout', 'userTrello', 'user');
//     });

//     beforeEach(function () {
//         var scope = $rootScope.$new();
//         user = {};

//         _$controller = $controller('ShellController', {$scope:scope, user: user});
//         $rootScope.$apply();

//     });

//     describe('Shell controller', function() {
//         it('should be created successfully', function () {
//             expect(_$controller).to.be.defined;
//         });

//         it('should show splash screen', function () {
//             console.log($rootScope);
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
//             expect(_$controller.sidebar.visible).to.be.true;
//         });

//         it('should have sidebar toggle function', function () {
//             _$controller.sidebar.sidebarToggle(true);
//             expect(_$controller.sidebar.visible).to.be.false;
//         });

//     });
// });
