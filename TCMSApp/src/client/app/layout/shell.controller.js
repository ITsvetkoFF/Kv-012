(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger', '$scope'];
    /* @ngInject */
    function ShellController($rootScope, $timeout, config, logger, $scope) {
        var vm = this;
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        $rootScope.showSplash = true;
        vm.navline = {
            title: config.appTitle,
            text: 'Created by John Papa',
            link: 'http://twitter.com/john_papa'
        };

        $rootScope.$on('onDeauthorized', function(){
            $scope.shellVisiable = false;
        });

        $rootScope.$on('onAuthorized', function(){
            $scope.shellVisiable = true;
        });

        activate();

        function activate() {
            logger.success(config.appTitle + ' loaded!', null);
            hideSplash();

        }

        function hideSplash() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function () {
                $rootScope.showSplash = false;
            }, 1000);
        }
    }


})();
