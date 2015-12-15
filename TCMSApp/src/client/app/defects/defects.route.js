(function() {
    'use strict';

    angular
        .module('app.defects')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'defects',
                config: {
                    url: '/defects/list',
                    templateUrl: 'app/defects/defects.html',
                    controller: 'DefectsController',
                    controllerAs: 'vm',
                    title: 'Defects',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-lock"></i> Defects'
                    }
                }
            }
        ];
    }
})();
