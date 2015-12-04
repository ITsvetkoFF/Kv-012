angular.module('appName')
    .controller('addTestCtrl', function($scope, $uibModalInstance){

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };

    })
