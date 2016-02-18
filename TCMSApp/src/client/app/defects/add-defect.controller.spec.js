/* jshint -W117, -W030 */
describe('Tests Add-Defects Open Model', function () {
    var controller, controllerModal, scope, state,
        project = {
            '_id': '56b11ca040e8e38011671d5b',
            'name': 'Orn and Sons',
            'description': 'Necessitatibus sit et.',
            'admins': [
                '56b11ca040e8e38011671d56'
            ],
            'users': [
                '56b11ca040e8e38011671d53',
                '56b11ca040e8e38011671d59',
                '56b11ca040e8e38011671d57',
                '56b11ca040e8e38011671d58',
                '56b11ca040e8e38011671d5a'
            ],
            'dateStart': '2015-11-05T21:45:01.970Z',
            'dateEnd': '2016-10-25T12:52:31.662Z'
        },
        users = [
            {
                '_id': '56b323080d43df5011807f2a',
                'lastName': 'Mart',
                'firstName': 'Alex',
                'email': 'tester1@soft.com',
                'password': '$2a$10$X1mcILfK.HfqBk3oUsszOeAi2RitZcaVCd4Awl4pmsuBL2vCf0Bti',
                '__v': 0,
                'projects': []
            }
        ],
        user = {
            '_id': '56b323080d43df5011807f2a',
            'lastName': 'Mart',
            'firstName': 'Alex',
            'email': 'tester1@soft.com',
            'password': '$2a$10$X1mcILfK.HfqBk3oUsszOeAi2RitZcaVCd4Awl4pmsuBL2vCf0Bti',
            '__v': 0,
            'projects': []
        };
    var Trello = {
        authorized: function () {
            return true;
        },
        authorize: function () {
        },
        get: function () {
        }
    };
    beforeEach(function () {
        module(function ($provide) {
            $provide.constant('Trello', Trello);
        });
        bard.appModule('app.defects');
        bard.inject('$controller', '$rootScope', '$httpBackend', '$state', 'apiUrl', 'user', '$uibModal');
        scope = $rootScope.$new();
        state = {};
        state.$current = {};
        state.$current.name = 'defects';
        state.previousState = 'defects';
        state.run = 'true';
        controller = $controller('AddDefectController', {$scope: scope, $state: state, $stateParams: state});
        $httpBackend.when('GET', '/api/v1/User').respond(users);
        $httpBackend.when('GET', /\/api\/v1\/Users\/*/).respond(user);
        $httpBackend.when('GET', /\/api\/v1\/Projects\/*/).respond(project);
        $httpBackend.flush();
        $rootScope.$apply();
    });

    describe('Add-Defects Controller', function () {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });
    });
});
