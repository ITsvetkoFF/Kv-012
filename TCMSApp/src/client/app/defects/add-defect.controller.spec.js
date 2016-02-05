/* jshint -W117, -W030 */
describe('Tests Add-Defects Open Model', function() {
    var controller, controllerModal, scope, state;
    var Trello = {
        authorized: function() {
            return true;
        },
        authorize: function() {},
        get: function() {}
    };
    beforeEach(module('app.core'));
    beforeEach(function() {
        module(function($provide) {
            $provide.constant('Trello', Trello);
        });
    });
    beforeEach(function () {
        bard.appModule('app.defects');
        bard.inject('$controller', '$rootScope', '$httpBackend', '$state', 'apiUrl', 'user', '$uibModal');
    });

    beforeEach(function () {
        scope = $rootScope.$new();
        state = {};
        state.$current = {};
        state.$current.name = 'defects';
        state.previousState = 'defects';
        state.run = 'true';
        controller = $controller('AddDefectController', {$scope: scope, $state: state, $stateParams:state});
        var httpBackend = $httpBackend;
        httpBackend.when('GET', apiUrl.user).respond(
            [
                {
                    '_id':'56b323080d43df5011807f2a',
                    'lastName':'Mart',
                    'firstName':'Alex',
                    'email':'tester1@soft.com',
                    'password':'$2a$10$X1mcILfK.HfqBk3oUsszOeAi2RitZcaVCd4Awl4pmsuBL2vCf0Bti',
                    '__v':0,
                    'projects':[]}
            ]
        );
        httpBackend.flush();
        $rootScope.$digest();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Add-Defects Controller', function () {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });
    });
});
