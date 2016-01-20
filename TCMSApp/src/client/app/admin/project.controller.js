(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = ['logger', 'ManageTrelloProject', 'createProjectFactory', '$q', '$rootScope', 'Trello', '$http', 'authservice'];

    function ProjectController(logger, ManageTrelloProject, createProjectFactory, $q, $rootScope, Trello, $http, authservice) {
        var vmProject = this;

        vmProject.hasSprints = true;
        vmProject.boards = [];
        vmProject.refreshBoards = refreshBoards;

        activate();

        vmProject.deleteList = function(data) {
            if(!data.ticked) {
                ManageTrelloProject.closeList(data.id);
            } else {
                ManageTrelloProject.openList(data.id);
            }
            refreshBoards();
        };

        function activate() {
            logger.info('Manage project view activated');
            authservice.authorize();
            refreshBoards();
        }

        // temporary method for my needs
        function getCurrentProject() {

            var deferred = $q.defer();

            $http.get('/api/v1/projects')
                .success(function (data) {
                    deferred.resolve(data[0]);
                });

            return deferred.promise;
        }

        function refreshBoards() {
            getCurrentProject().then(function (currentProject) {
                Trello.get('organizations/' + currentProject.trelloOrganizationId + '/boards')
                    .then(function (boards) {
                        vmProject.boards.length = 0;
                        for (var i = 0; i < boards.length; i++) {

                            ManageTrelloProject.setBoardLists(boards[i]);
                            vmProject.boards.push(boards[i]);
                        }
                    }, function (err) {
                        logger.error(err.responseText);
                    });
            });
        }
    }
})();
