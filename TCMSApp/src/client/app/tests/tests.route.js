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
                state: 'tests-list',
                config: {
                    url: '/tests/list',
                    templateUrl: 'app/tests/tests-list.html',
                    controller: 'TestsListController',
                    controllerAs: 'vmTests',
                    title: 'Tests',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-lock"></i> Tests'
                    }
                }
            },
            {
                state: 'tests-create',
                config: {
                    url: '/tests/create',
                    templateUrl: 'app/tests/tests-create.html',
                    controller: 'TestsCreateController',
                    controllerAs: 'vmCase',
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
