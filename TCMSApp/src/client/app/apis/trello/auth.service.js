(function () {
    'use strict';

    angular
        .module('app.trello')
        .factory('authservice', authservice);

    authservice.$inject = ['Trello'];
    /* @ngInject */
    function authservice(Trello) {

        return {
            authorize: authorize
        };

        function authorize() {
            Trello.authorize({
                type: "popup",
                name: "Getting Started Application",
                scope: {
                    read: true,
                    write: true
                },
                expiration: "never"
            });

            return Trello;
        }
    }
})();

