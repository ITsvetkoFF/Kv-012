(function() {
    'use strict';

    angular
        .module('app.admin')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'admin',
                config: {
                    url: '/admin',
                    templateUrl: 'app/admin/admin.html'
                }
            },
            {
                state: 'admin.team',
                config: {
                    url: '/team',
                    templateUrl: 'app/admin/team.html',
                    controller: 'TeamController',
                    controllerAs: 'vmTeam',
                    title: 'Manage Team',
                    parent: 'admin'
                }
            },
            {
                state: 'admin.time',
                config: {
                    url: '/time',
                    templateUrl: 'app/admin/time.html',
                    controller: 'AdminController',
                    controllerAs: 'vm',
                    title: 'Manage Time',
                    parent: 'admin'
                }
            },
            {
                state: 'admin.project',
                config: {
                    url: '/project',
                    templateUrl: 'app/admin/project.html',
                    controller: 'ProjectController',
                    controllerAs: 'vmProject',
                    title: 'Manage Project',
                    parent: 'admin'
                }
            },
            {
                state: 'profile',
                config: {
                    url: '/profile',
                    templateUrl: 'app/admin/profile.html',
                    controller: 'AdminController',
                    controllerAs: 'vm',
                    title: 'Profile'
                }
            }
        ];
    }
})();
