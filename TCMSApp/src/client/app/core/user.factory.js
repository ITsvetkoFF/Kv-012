(function() {
    'use strict';

    angular.module('app.core')
        .factory('user', userFactory);

    userFactory.$inject = ['userTrello', '$rootScope', '$http', '$q'];

    function userFactory(userTrello, $rootScope, $http, $q) {
        var service = {
            authorized: userTrello.authorized,
            idTrello: undefined,
            idBoards: [],
            idOrganizations: [],
            status: '',
            avatarUrl: '',
            currentProject: {},
            firstName: '',
            lastName: '',
            role: '',
            email: undefined,
            currentProjectID: undefined,
            authorize: authorize,
            changeCurrentProject: changeCurrentProject,
            deauthorize: deauthorize
        };

        $rootScope.$on('TrelloUserAuthorized', function() {
            service.authorized = true;
            $rootScope.$broadcast('UserAuthorized');
            userTrello.getMe().then(function(data) {
                service.idTrello = data.id;
                service.idBoards = data.idBoards;
                service.idOrganizations = data.idOrganizations;
                service.status = data.status;
                service.avatarUrl = 'https://trello-avatars.s3.amazonaws.com/' + data.avatarHash + '/170.png';
                getUser({trelloUserID: service.idTrello});
            });
        });

        function getUser(idObj) {
            var deferred = $q.defer();

            $http.get('/api/v1/Users?query=' + JSON.stringify(idObj)).success(function(data) {
                if (data[0]) {
                    service.firstName = data[0].firstName;
                    service.lastName = data[0].lastName;
                    service.role = data[0].role;
                    service.id = data[0]._id;
                    service.email = data[0].email;
                    service.currentProjectID = data[0].currentProjectID;

                    if (service.currentProjectID) {
                        $http.get('/api/v1/Projects/' + service.currentProjectID).success(function(data) {
                            service.currentProject = data;
                        });
                    }

                    deferred.resolve();
                    if (!$rootScope.$$phase) {
                        $rootScope.$digest();
                    }
                }
            });

            return deferred.promise;
        }

        $rootScope.$on('UserDeauthorized', function() {
            service.authorized = false;
        });

        function authorize() {
            userTrello.authorize() ;
        }

        function deauthorize() {
            userTrello.deauthorize() ;
        }

        function changeCurrentProject(id) {
            $http.put('/api/v1/Users/' + service.id, {currentProjectID: id}).success(function() {
                service.currentProjectID = id;
            });
        }

        return service;

    }
})();
