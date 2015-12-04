angular.module('appName')
    .controller('myProjectsCtrl', function($scope, $uibModalInstance, $uibModal){

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };

        $scope.createProject = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "partials/create_project.html",
                controller: "newProjectCtrl",
                size: 'sm'
            })
        }

    })

