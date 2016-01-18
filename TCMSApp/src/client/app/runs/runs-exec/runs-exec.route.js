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
                    url: '/runs/edit',
                    templateUrl: 'app/runs/runs-exec/runs-edit.html',
                    controller: 'RunsEditController',
                    controllerAs: 'vmRunsEdit',
                    title: 'Edit Test Run',
                    params: {
                        run: {
                            value: {},
                            squash: false
                        }
                    }
                }
            },
            {
                state: 'runs-execute',
                config: {
                    url: '/runs/execute',
                    templateUrl: 'app/runs/runs-exec/runs-execute.html',
                    controller: 'RunsExecuteController',
                    controllerAs: 'vmRunsExecute',
                    title: 'Execute Test Run',
                    params: {
                        run: {
                            value: {},
                            squash: false
                        }
                    }
                }
            }
        ];

    }
}) ();
