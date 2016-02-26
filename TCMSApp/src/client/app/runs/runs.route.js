(function() {
    'use strict';

    angular
        .module('app.runs')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'runs/list',
                config: {
                    url: '/runs/list',
                    templateUrl: 'app/runs/runs.html',
                    controller: 'RunsController',
                    controllerAs: 'vmRuns',
                    title: 'Runs'
                }
            }
        ];
    }
})();
