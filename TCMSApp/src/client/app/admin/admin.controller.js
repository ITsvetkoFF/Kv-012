(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['logger', 'user', '$state'];
    /* @ngInject */
    function AdminController(logger, user, $state) {
        var vm = this;
        vm.title = 'Admin';

        activate();

        function activate() {
            if (!user.authorized) {
                $state.go('index');
            }
            logger.info('Activated Admin View');
        }
    }
})();
