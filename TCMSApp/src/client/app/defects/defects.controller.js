(function () {
    'use strict';

    angular
        .module('app.defects')
        .controller('DefectsController', DefectsController);

    DefectsController.$inject = ['logger', '$uibModal', 'getDefects', '$state'];
    /* @ngInject */
    function DefectsController(logger, $uibModal, getDefects, $state) {
        var vm = this;
        vm.arrayDefects = getDefects.fakeDefect(10);
        vm.toogledAll = false;
        if(vm.arrayDefects) {
            vm.currentDefect = vm.arrayDefects[0];
            vm.setCurrentDefect = function (x) {
                vm.currentDefect = x;
            }
        }
        else{
            vm.currentDefect == null;
        }

        vm.previousState = $state.$current.name;

        activate();

        function activate() {
            logger.info('Activated Defects View');
        }
    }
})();
