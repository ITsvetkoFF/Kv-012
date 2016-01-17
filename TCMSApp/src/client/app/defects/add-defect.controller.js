/**
 * @ngdoc controller
 * @memberOf app.defects
 * @name addDefectController
 * Creates for view, where the modal will be open
 */

(function() {
    'use strict';

    angular
        .module('app.defects')
        .controller('AddDefectController', AddDefectController);

    AddDefectController.$inject = ['$uibModal', '$state', '$scope', '$stateParams', '$rootScope', 'logger'];

    function AddDefectController($uibModal, $state, $scope, $stateParams, $rootScope, logger) {

        var vm = this;
        vm.open = openAddDefectModal;

        vm.open();

        /**
         * Opens "Add defect" modal window
         * @memberOf addDefectController
         */
        function openAddDefectModal () {
            if (!$stateParams.previousState) {
                $state.go('dashboard');
            } else {
                $uibModal.open({
                    templateUrl: 'addDefectModalTemplate.html',
                    controller: function ($uibModalInstance, $state, $scope, $rootScope, logger) {
                        var vmDefectModal = this;
                        var allowStateChange = false;

                        if ($stateParams.run) {
                            vmDefectModal.run = $stateParams.run.info;
                        }

                        vmDefectModal.cancel = function () {
                            allowStateChange = true;

                            $uibModalInstance.dismiss('cancel');
                            $state.go($stateParams.previousState);
                        };

                        // prevent state changing without interraction with modal controlls
                        $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                            if (!allowStateChange) {
                                logger.warning('Please Save or Cancel this dialog!', '', 'Save or Cancel');
                                event.preventDefault();
                            }
                        });
                    },
                    controllerAs: 'vmDefectModal',
                    backdrop: 'static'
                });
            }
        }
    }
})();
