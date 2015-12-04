angular.module('appName')
    .controller('addBugCtrl', function($scope, $uibModalInstance){

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };

    })
