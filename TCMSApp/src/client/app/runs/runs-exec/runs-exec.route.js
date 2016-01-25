(function() {
    'use strict';

    angular
        .module('app.runsExec')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'runs-edit',
                config: {
                    url: '/runs/:id/edit',
                    templateUrl: 'app/runs/runs-exec/runs-edit.html',
                    controller: 'RunsEditController',
                    controllerAs: 'vmRunsEdit',
                    title: 'Edit Test Run',
                    params: {
                        run: {
                            value: undefined,
                            squash: false//the paraneter won't be shown in the url
                        }
                    }
                }
            },
            {
                state: 'runs-execute',
                config: {
                    url: '/runs/:id/execute',
                    templateUrl: 'app/runs/runs-exec/runs-execute.html',
                    controller: 'RunsExecuteController',
                    controllerAs: 'vmRunsExecute',
                    title: 'Execute Test Run',
                    params: {
                        run: {
                            value: undefined,
                            squash: false//the paraneter won't be shown in the url
                        }
                    }
                }
            }
        ];

    }
}) ();
