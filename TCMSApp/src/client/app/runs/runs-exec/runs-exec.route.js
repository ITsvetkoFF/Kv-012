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
                    title: 'Edit Test Run'
                }
            },
            {
                state: 'runs-execute',
                config: {
                    url: '/runs/:id/execute',
                    templateUrl: 'app/runs/runs-exec/runs-execute.html',
                    controller: 'RunsExecuteController',
                    controllerAs: 'vmRunsExecute',
                    title: 'Execute Test Run'
                }
            },

            // new nested route and controller for addDefect modal window
            {
                state: 'generate-defect',
                config: {
                    url: '/create-defect',
                    template: '<div></div>',
                    controller: 'AddDefectController',
                    controllerAs: 'vmAddDefect',
                    title: 'Defect',
                    params: {
                        previousState: null,
                        description: '',
                        stepsToReproduce: ''
                    },
                    parent: 'runs-execute'
                }
            }
        ];

    }
}) ();
