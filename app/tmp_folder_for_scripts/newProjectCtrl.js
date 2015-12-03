angular.module('appName')
    .controller('newProjectCtrl', function($scope, $uibModalInstance){

        $scope.create = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };

    })

