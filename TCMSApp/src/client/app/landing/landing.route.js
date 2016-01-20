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
                state: 'index',
                config: {
                    url: '/index',
                    templateUrl: 'app/landing/landing.html',
                    controller: 'LandingController',
                    controllerAs: 'vmLanding',
                    title: 'Landing'
                }
            }
        ];
    }
})();
