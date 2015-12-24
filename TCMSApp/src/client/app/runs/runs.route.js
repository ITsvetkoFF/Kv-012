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
                    controllerAs: 'runsVM',
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
