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
            fullName: '',
            role: '',
            email: undefined,
            currentProjectID: undefined,
            authorize: authorize,
            changeCurrentProject: changeCurrentProject,
            deauthorize: deauthorize
        };

        getMe();

        function getMe() {
            $http.get('/api/v1/User').success(function(data) {
                if (data) {
                    service.authorized = true;
                    service.fullName = data.fullName;
                    service.id = data._id;
                    service.email = data.email;
                    service.currentProjectID = data.currentProjectID;
                    service.trelloUserID = data.trelloUserID;

                    if (service.currentProjectID) {
                        $http.get('/api/v1/Projects/' + service.currentProjectID).success(function(data) {
                            service.currentProject = data;
                        });
                    }

                    if (service.trelloUserID) {
                        localStorage.setItem('trello_token', data.trelloToken);
                        userTrello.authorize();

                        userTrello.getMe(data.token).then(function(data) {
                            service.idTrello = data.id;
                            service.idBoards = data.idBoards;
                            service.idOrganizations = data.idOrganizations;
                            service.status = data.status;
                            service.avatarUrl =
                                'https://trello-avatars.s3.amazonaws.com/' + data.avatarHash + '/170.png';
                            service.fullName = data.fullName;
                            if (!$rootScope.$$phase) {
                                $rootScope.$digest();
                            }
                        });
                    }
                }
            });
        }

        $rootScope.$on('UserDeauthorized', function() {
            service.authorized = false;
        });

        function authorize() {
            userTrello.authorize() ;
        }

        function deauthorize() {
            userTrello.deauthorize() ;
            $http.post('/api/v1/User/logout');
        }

        function changeCurrentProject(id) {
            $http.put('/api/v1/Users/' + service.id, {currentProjectID: id}).success(function() {
                service.currentProjectID = id;
                getMe();
            });
        }

        return service;

    }
})();
