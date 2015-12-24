(function () {
    'use strict';

    angular
        .module('app.defects')
        .controller('DefectsController', DefectsController);

    DefectsController.$inject = ['logger', '$uibModal', 'getDefects'];
    /* @ngInject */
    function DefectsController(logger, $uibModal, getDefects) {
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

        vm.open = function () {
            $uibModal.open({
                templateUrl: 'addBugs.html',
                controller: function ($uibModalInstance) {
                    var vmDefectModal = this;
                    vmDefectModal.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                controllerAs: 'vmDefectModal'
            });
        };

        activate();

        function activate() {
            logger.info('Activated Defects View');
        }
    }
})();
