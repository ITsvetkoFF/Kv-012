(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger', '$scope', 'user'];
    /* @ngInject */
    function ShellController($rootScope, $timeout, config, logger, $scope, user) {
        var vm = this;
        $rootScope.showSplash = true;

        vm.navline = {
            title: config.appTitle,
            text: 'TCMS',
            currentProject: ''
        };

        vm.user = user;
        vm.showBars = false;

        $scope.$on('UserAuthorized', function() {
            vm.showBars = true;
        });

        $scope.$on('UserDeauthorized', function() {
            vm.showBars = false;
        });

        vm.sidebar = {
            sidebarToggle: function() {

                this.visible = !this.visible;
            }
        };

        activate();

        function activate() {
            if (user.authorized) {
                vm.showBars = true;
            }
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
