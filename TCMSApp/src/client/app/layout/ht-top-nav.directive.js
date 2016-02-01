(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('htTopNav', htTopNav);

    /* @ngInject */
    function htTopNav () {
        var directive = {
            bindToController: true,
            controller: TopNavController,
            controllerAs: 'vmNav',
            restrict: 'EA',
            replace: true,
            scope: {
                'navline': '=',
                'sidebar': '='
            },
            templateUrl: 'app/layout/ht-top-nav.html'
        };

        TopNavController.$inject = ['$rootScope', '$state', 'user'];

        /* @ngInject */
        function TopNavController($rootScope, $state, user) {
            var vm = this;
            vm.isCurrent = isCurrent;
            vm.user = user;
            vm.logOut = logOut;

            function isCurrent(route) {
                if (!$state.current || !$state.current.title) {
                    return '';
                }
                var menuName = route;
                return $state.current.title.substr(0, menuName.length) === menuName ? 'active' : '';
            }

            function logOut() {
                user.deauthorize();
                $state.go('landing.home');
            }

        }

        return directive;
    }
})();
