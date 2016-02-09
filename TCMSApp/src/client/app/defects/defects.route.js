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
                    controllerAs: 'vmDefects',
                    title: 'Defects',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-lock"></i> Defects'
                    }
                }
            },
            // new nested route and controller for add defect modal window
            {
                state: 'add-defect',
                config: {
                    url: '/create',
                    template: '<div></div>',
                    controller: 'AddDefectController',
                    controllerAs: 'vmAddDefect',
                    title: 'Defect',
                    params: {
                        previousState: null,
                        run: null
                    },
                    parent: 'defects'
                }
            }
        ];
    }
})();
