(function () {
    'use strict';

    angular
        .module('app.landing')
        .controller('LandingController', LandingController);

    LandingController.$inject = ['logger', '$state','$scope', 'user'];
    /* @ngInject */
    function LandingController(logger, $state, $scope, user) {
        var vmLanding = this;
        vmLanding.logIn = logIn;
        vmLanding.user = user;

        activate();

        $scope.$on('UserAuthorized', function() {
            $state.go('dashboard');
        });

        function logIn() {
            user.authorize();
            if (user.authorized) {
                $state.go('dashboard');
            }
        }

        function activate() {
            if (user.authorized) {
                $state.go('dashboard');
            }
        }

    }
})();
