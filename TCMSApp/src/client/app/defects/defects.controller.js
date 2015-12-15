(function () {
    'use strict';

    angular
        .module('app.defects')
        .controller('DefectsController', DefectsController);

    DefectsController.$inject = ['$scope', 'logger', '$uibModal'];
    /* @ngInject */
    function DefectsController($scope, logger, $uibModal) {
        var vm = this;

        $scope.open = function () {
            $uibModal.open({
              templateUrl: 'addBugs.html',
              controller: function($uibModalInstance ,$scope){
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
            });
        };

        activate();

        function activate() {
            logger.info('Activated Defects View');
        }
    }
})();
