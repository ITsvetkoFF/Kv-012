/* jshint -W117, -W030 */
describe('TeamController', function () {
    var controller, scope;

    beforeEach(function () {
        bard.appModule('app.admin', function ($provide) {
            $provide.value('authservice', {
                authorized: function () {
                    return true;
                },
                authorize: function () {
                    return undefined;
                }
            });
            $provide.value('TrelloTeamFactory', {
                addUser: function(user) { return 'user'; },
                getUsers: function(users) { return [] }
            });
        });

        bard.inject('$controller', 'logger', 'TrelloTeamFactory', '$rootScope', '$q',
            'createProjectFactory', 'Trello', '$http');
    });

    beforeEach(function () {

        scope = $rootScope.$new();

        controller = $controller('TeamController', {
            $scope: scope
        });

        $rootScope.$apply();
        $rootScope.$digest();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Admin controller', function () {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

    });
});