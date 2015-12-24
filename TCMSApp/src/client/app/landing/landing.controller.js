(function () {
    'use strict';

    angular
        .module('app.landing')
        .controller('LandingController', LandingController);

    LandingController.$inject = ['$q', 'dataservice', 'logger', '$scope', '$state', '$rootScope'];
    /* @ngInject */

    function LandingController($q, dataservice, logger, $scope, $state, $rootScope) {
        var vm = this;
        vm.news = {
            title: 'TCMSApp',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Landing';

        activate();

        function activate() {
            var promises = [getMessageCount(), getPeople()];

            return $q.all(promises).then(function () {
                logger.info('Activated Landing View');
            });
        }

        function getMessageCount() {
            return dataservice.getMessageCount().then(function (data) {
                vm.messageCount = data;
                return vm.messageCount;
            });
        }

        function getPeople() {
            return dataservice.getPeople().then(function (data) {
                vm.people = data;
                return vm.people;
            });
        }

        $scope.logIn = function () {
            Trello.authorize({
                type: "popup",
                success: onAuthorize
            })
        };

        var onAuthorize = function () {
            window.localStorage.setItem('authorized', 'true');
            if(Trello.authorized()){
                $rootScope.$broadcast('authorized');
                $state.go('dashboard');
            }
        };

    }
})();
