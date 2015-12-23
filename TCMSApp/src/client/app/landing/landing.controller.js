(function () {
    'use strict';

    angular
        .module('app.landing')
        .controller('LandingController', LandingController);

    LandingController.$inject = ['$q', 'dataservice', 'logger', '$rootScope', '$state', '$rootScope'];
    /* @ngInject */

    function LandingController($q, dataservice, logger,$scope, $state,$rootScope) {
        var vm = this;
        vm.news = {
            title: 'TCMSApp',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Dashboard';
        vm.profile = 'You are not signed in';

        $scope.logIn = function(){
            Trello.authorize({
                type: "popup",
                name: "TCMSApp",
                success: onAuthorize
            });

        };

        $scope.logOut = function(){
            Trello.deauthorize();
            window.localStorage.setItem('authorized', 'false');
            vm.profile = 'You are not signed in';
        };

        var onAuthorize = function () {

            window.localStorage.setItem('authorized', 'true');
            $rootScope.$broadcast('onAuthorized');
            Trello.members.get('me', function (member) {
                vm.profile = "Hello, " + member.fullName + "!";
            });
            if(Trello.authorized()) {
                $state.go('dashboard');
            }

        };



    }
})();
