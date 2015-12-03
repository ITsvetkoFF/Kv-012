angular.module('appName')
    .controller('myProjectsCtrl', function($scope, $uibModalInstance){

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };

    })

