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
        .factory('authservice', authservice);

    authservice.$inject = ['Trello', '$rootScope'];
    /* @ngInject */
    function authservice(Trello, $rootScope) {

        return {
            authorize: authorize
        };

        /**
         * Authentication method
         * @memberOf authService
         * @returns {Trello}
         */
        function authorize() {

            Trello.authorize({
                type: 'popup',
                name: 'Getting Started Application',
                scope: {
                    read: true,
                    write: true
                },
                expiration: 'never',
                success: function(res) {
                    $rootScope.$broadcast('TrelloAuthorized');
                }
            });

            return Trello;
        }
    }
})();

