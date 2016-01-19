(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = ['logger', 'ManageTrelloProject', 'createProjectFactory', '$q'];

    function ProjectController(logger, createProjectFactory, ManageTrelloProject, $q) {
        var vmProject = this;
        vmProject.hasSprints = true;
        vmProject.boards = [];
        vmProject.refreshBoards = refreshBoards;

        activate();

        function activate() {
            logger.info('Manage project view activated');
        }

        function refreshBoards() {

            //TODO getCurrentProject is not a function
            //get current project's boards
            var currentProject = createProjectFactory.getCurrentProject();

            $q
                .when(ManageTrelloProject.Organization.getBoards(currentProject.trello.id))
                .then(function(res) {
                    vmProject.boards = res;
                }, function(err) {

                });
        }
    }
})();
