(function() {
    'use strict';

    angular
        .module('app.tests')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'tests',
                config: {
                    url: '/tests/list',
                    templateUrl: 'app/tests/tests.html',
                    controller: 'TestsController',
                    controllerAs: 'vm',
                    title: 'Tests',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-lock"></i> Tests'
                    }
                }
            },
            {
                state: 'test-create',
                config: {
                    url: '/tests/create',
                    templateUrl: 'app/tests/test-create.html',
                    controller: 'TestsController',
                    controllerAs: 'vm',
                    title: 'Create Test Case',
                    settings: {
                        nav: 5,
                        content: '<i class="fa fa-team"></i> Create Test Case'
                    }
                }
            }
        ];
    }
})();
