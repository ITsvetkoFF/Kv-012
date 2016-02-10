(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        var otherwise = '/dashboard';
        routerHelper.configureStates(getStates(), otherwise);
    }

    function getStates() {
        return [];
    }
})();
