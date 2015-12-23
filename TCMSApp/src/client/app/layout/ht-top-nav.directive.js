(function () {
    'use strict';

    angular
        .module('app.layout')
        .directive('htTopNav', htTopNav);

    /* @ngInject */
    function htTopNav() {
        var directive = {
            bindToController: true,
            controller: TopNavController,
            controllerAs: 'vm',
            restrict: 'EA',
            replace: true,
            scope: {
                'navline': '='
            },
            templateUrl: 'app/layout/ht-top-nav.html'
        };

        TopNavController.$inject = ['$state', '$rootScope', '$scope'];

        /* @ngInject */
        function TopNavController($state, $rootScope, $scope) {
            var vm = this;
            vm.isCurrent = isCurrent;

            function isCurrent(route) {
                if (!$state.current || !$state.current.title) {
                    return '';
                }
                var menuName = route;
                return $state.current.title.substr(0, menuName.length) === menuName ? 'active' : '';
            }

            $scope.logOut = function(){
                Trello.deauthorize();
                window.localStorage.setItem('authorized', 'false');
                $rootScope.$broadcast('onDeauthorized');
                $state.go('landing')
            };

            $rootScope.$on('onAuthorized', function () {
                Trello.members.get('me', function (member) {
                    console.log('aaaaaaaaaaaaa' + member.fullName);
                    vm.profile = member.fullName;
                });
            });

        }

        return directive;
    }
})();
