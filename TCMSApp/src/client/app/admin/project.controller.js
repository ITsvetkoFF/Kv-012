(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = ['logger', 'ManageTrelloProject', 'authservice'];

    function ProjectController(logger, ManageTrelloProject, authservice) {
        var vmProject = this;

        vmProject.hasSprints = true;
        vmProject.boards = [];
        vmProject.refreshBoards = refreshBoards;

        activate();

        vmProject.deleteList = function(data) {
            if (!data.ticked) {
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

        function refreshBoards() {
            ManageTrelloProject.refreshBoards(vmProject.boards);
        }
    }
})();
