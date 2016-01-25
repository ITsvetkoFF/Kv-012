/**
 * @ngdoc controller
 * @name dashboardController
 * @memberOf app.dashboard
 * @description Controls dashboard view logic
 */

(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'dataservice', 'logger', 'user', '$state'];
    /* @ngInject */

    function DashboardController($q, dataservice, logger, user, $state) {
        var vm = this;

        activate();

        function activate() {

            logger.info('Activated Dashboard View');

        }

    }
})();
