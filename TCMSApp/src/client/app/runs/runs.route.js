(function() {
    'use strict';

    angular
        .module('app.runs')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */

    /**
     * @memberOf app.runs
     * @ngdoc run
     * @description run states configuration
     * @param routerHelper {provider}
     */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    /**
     * @memberOf app.runs
     * @description get states of routes
     * @function getStates
     * @returns {Array} states that presents on runs template
     */
    function getStates() {
        return [
            {
                state: 'runs/list',
                config: {
                    url: '/runs/list',
                    templateUrl: 'app/runs/runs.html',
                    controller: 'RunsController',
                    controllerAs: 'vm',
                    title: 'Runs',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-lock"></i> Runs'
                    }
                }
            },
            {
                state: 'run-execute',
                config: {
                    url: '/runs/execute',
                    templateUrl: 'app/runs/run-execute.html',
                    controller: 'RunsController',
                    controllerAs: 'vm',
                    title: 'Create Test Case',
                    settings: {
                        nav: 5,
                        content: '<i class="fa fa-team"></i> Execute Run'
                    }
                }
            }
        ];
    }
})();
