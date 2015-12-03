angular.module('appName').controller('appNameCtrl', function($scope, $uibModal){

    $scope.changeActiveProject = function(){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: "partials/my_projects.html",
            controller: "myProjectsCtrl"
        });
    };

})