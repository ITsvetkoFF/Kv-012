/* jshint -W117, -W030 */
describe('TestsController', function () {
    var scope, controller, suiteID = '569fd358be47dd8b09b4f469';

    var suites = mockData.getMockSuites();
    var steps = mockData.getMockSteps();
    var me = mockData.getMe();
    var projects = mockData.getProjects();
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
    var runsApiService = sinon.mock({});
    var user = sinon.mock({});
    var userTrello = sinon.mock({});

    beforeEach(function () {
        bard.appModule('app.tests', function($provide) {
            $provide.value('RunsApiService', runsApiService);
            $provide.value('user', user);
            $provide.value('userTrello', userTrello);
        });
        bard.inject('$controller', '$rootScope', '$httpBackend', 'apiUrl');
    });

    beforeEach(function () {

        scope = $rootScope.$new();
        controller = $controller('TestsListController', {$scope: scope});

        $httpBackend.when('GET', apiUrl.host + apiUrl.suites).respond(suites);
        $httpBackend.when('GET', apiUrl.host + apiUrl.suiteTests +
            '?query={"suite" : "' + '569fd358be47dd8b09b4f469' + '"}').respond(
            mockData.getMockTestsOfSuite('569fd358be47dd8b09b4f469'));
        $httpBackend.when('GET', apiUrl.host + apiUrl.suiteTests +
            '?query={"suite" : "' + '56a0c46042a230635622f6f8' + '"}').respond(
            mockData.getMockTestsOfSuite('56a0c46042a230635622f6f8'));
        $httpBackend.when('GET', apiUrl.host + apiUrl.suiteTests +
            '?query={"suite" : "' + '56a623b5c2b74a5831279f1e' + '"}').respond(
            mockData.getMockTestsOfSuite('56a623b5c2b74a5831279f1e'));
        $httpBackend.when('GET', /\/api\/v1\/Projects\/*/).respond(projects);
        $httpBackend.when('GET', '/api/v1/User').respond();

        $httpBackend.flush();
        $rootScope.$apply();
    });

    describe('TestsListController', function () {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });
    });

    describe('Controller suite list', function () {
        it('should be an array', function () {
            expect(controller.suites).to.be.instanceOf(Array);
        });
    });

    describe('First suite of list', function () {
        it('should be selected', function () {
            expect(JSON.stringify(controller.currentSuite)).to.equal(JSON.stringify(suites[0]));
        });
    });

    describe('After test suite selected', function () {
        it('should be selected', function () {
            var i, l = suites.length;
            for (i = 0; i < l; i++) {
                controller.setSuite(suites[i]);
                expect(JSON.stringify(controller.currentSuite)).to.equal(JSON.stringify(suites[i]));
            }
        });
    });

    describe('After test suite selected', function () {
        it('test should be loaded', function () {
            var i, l = suites.length;
            for (i = 2; i >= 0; i--) {
                controller.setSuite(suites[i]);
                setTimeout(function () {
                    expect(JSON.stringify(controller.tests)).to
                        .equal(JSON.stringify(mockData.getMockTestsOfSuite(controller.currentSuite._id)));
                }, 0);
            }
        });
    });

});
