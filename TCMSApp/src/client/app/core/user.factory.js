(function() {
    'use strict';

    angular.module('app.core')
        .factory('user', userFactory);

    userFactory.$inject = ['userTrello', '$rootScope'];

    function userFactory(userTrello, $rootScope) {
        var service = {};

        service.authorized = userTrello.authorized;

        $rootScope.$on('UserAuthorized', function() {
            service.authorized = true;
            userTrello.getMe().then(function(data) {
                service.idTrello = data.id;
                service.fullName = data.fullName;
                service.idBoards = data.idBoards;
                service.idOrganizations = data.idOrganizations;
                service.status = data.status;
            });
            $rootScope.$digest();
        });

        $rootScope.$on('UserDeauthorized', function() {
            service.authorized = false;
        });

        service.authorize = function() {
            userTrello.authorize();
        };

        service.deauthorize = function() {
            userTrello.deauthorize();
        };

        return service;

    }
})();
