angular.module('appName').controller('appNameCtrl', function($scope, $uibModal){

    $scope.changeActiveProject = function(){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: "partials/my_projects.html",
            controller: "myProjectsCtrl"
        });
    };

    $scope.addTest = function(){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: "partials/add-test.html",
            controller: "addTestCtrl"
        });
    };

    $scope.addBug = function(){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: "partials/add_bug.html",
            controller: "addBugCtrl",
            size: 'lg'
        });
    };

    $scope.runTest = function(){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: "partials/run-test.html",
            controller: "runTestCtrl"
        });
    };

})