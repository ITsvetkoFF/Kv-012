(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = ['logger', 'ManageTrelloProject', 'authservice'];

    function ProjectController(logger, ManageTrelloProject, authservice) {

        var vmProject = this;
        vmProject.hasSprints = true;
        vmProject.backlog = {
            name: "Backlog",
            inputLists: [],
            outputLists: []
        };
        vmProject.working = {
            name: "Working",
            inputLists: [],
            outputLists: []
        };
        vmProject.refreshBoards = refreshBoards;
        vmProject.changeList = changeList;

        activate();

        function changeList(data) {
            ManageTrelloProject.changeList(data)
                .then(function(list) {
                    refreshBoards();
                }, function(err) {
                    logger.error(err.responseText);
                });
        }

        function activate() {
            logger.info('Manage project view activated');
            authservice.authorize();
            refreshBoards();
        }

        function refreshBoards() {
            ManageTrelloProject.refreshBoard(vmProject.backlog);
            ManageTrelloProject.refreshBoard(vmProject.working);
        }
    }
})();
