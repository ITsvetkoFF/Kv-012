/**
 * @ngdoc service
 * @name authService
 * @memberOf app.trello
 * @description
 * Provides authentication method for Trello object
 * @example
 * ```
 * ...$inject = [..., 'authservice'];
 *
 * function someService(authservice) {
 *     var Trello = authservice.authorize();
 * }
 * ```
 */

(function () {
    'use strict';

    angular
        .module('app.trello')
        .factory('userTrello', userTrello);

    userTrello.$inject = ['Trello', '$rootScope', '$q', '$timeout', '$http'];
    /* @ngInject */
    function userTrello(Trello, $rootScope, $q, $timeout, $http) {

        if (localStorage.getItem('trello_token')) {
            $timeout(function() {authorize();},0);
        }

        return {
            authorize: authorize,
            authorized: Trello.authorized(),
            deauthorize: deauthorize,
            getMe: getMe
        };

        /**
         * Authentication method
         * @memberOf authService
         * @returns {Trello}
         */
        function authorize() {
            Trello.authorize({
                type: 'popup',
                name: 'TCMS',
                scope: {
                    read: true,
                    write: true
                },
                expiration: 'never'
            });
        }

        function deauthorize() {
            Trello.deauthorize();
            $rootScope.$broadcast('UserDeauthorized');
        }

        function getMe() {
            var deferred = $q.defer();
            Trello.get('/members/me/', function(data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }
    }
})();

