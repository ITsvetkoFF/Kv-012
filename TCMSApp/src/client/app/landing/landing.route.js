(function() {
    'use strict';

    angular
        .module('app.landing')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'landing',
                config: {
                    templateUrl: 'app/landing/landing.html',
                    controller: 'LandingController',
                    controllerAs: 'vmLanding'
                }
            },
            {
                state: 'landing.home',
                config: {
                    url: '/landing',
                    templateUrl: 'app/landing/home.html'
                }
            },
            {
                state: 'landing.login',
                config: {
                    url: '/login',
                    templateUrl: 'app/landing/login.html'
                }
            },
            {
                state: 'landing.register',
                config: {
                    url: '/register',
                    templateUrl: 'app/landing/register.html'
                }
            }
        ];
    }
})();
