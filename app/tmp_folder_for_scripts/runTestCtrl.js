angular.module('appName')
    .controller('runTestCtrl', function($scope, $uibModalInstance){

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };

    })
