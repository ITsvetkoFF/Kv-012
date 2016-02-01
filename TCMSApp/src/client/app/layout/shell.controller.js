(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger', '$scope', 'user', '$state'];
    /* @ngInject */
    function ShellController($rootScope, $timeout, config, logger, $scope, user, $state) {
        var vm = this;
        $rootScope.showSplash = true;

        vm.navline = {
            title: config.appTitle,
            text: 'TCMS',
            currentProject: ''
        };

        vm.user = user;

        vm.sidebar = {
            sidebarToggle: function() {
                this.visible = !this.visible;
            }
        };

        activate();

        function activate() {
            $scope.$watch(function () {
                return vm.user;
            }, function(newval, oldval) {
                $timeout(function() {
                    if (!newval.authorized && $state.current.name.split('.')[0] !== 'landing') {
                        $state.go('landing.home');
                    } else if (newval.authorized && $state.current.name.split('.')[0] === 'landing') {
                        $state.go('dashboard');
                    }
                }, 0);
            }, true);

            logger.success(config.appTitle + ' loaded!', null);
            hideSplash();
        }

        function hideSplash() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function() {
                $rootScope.showSplash = false;
            }, 1000);
        }
    }
})();
