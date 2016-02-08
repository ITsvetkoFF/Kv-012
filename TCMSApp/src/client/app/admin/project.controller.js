(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = ['logger', 'ManageTrelloProject', 'user', '$state'];

    function ProjectController(logger, ManageTrelloProject, user, $state) {

        var vmProject = this;
        vmProject.hasSprints = true;
        vmProject.backlog = {
            name: 'Backlog',
            inputLists: [],
            outputLists: []
        };
        vmProject.working = {
            name: 'Working',
            inputLists: [],
            outputLists: []
        };
        vmProject.refreshBoards = refreshBoards;
        vmProject.changeList = changeList;
        vmProject.selectAll = selectAll;
        vmProject.selectNone = selectNone;

        activate();

        function changeList(data) {
            ManageTrelloProject.changeList(data)
                .then(function(list) {
                    refreshBoards();
                }, function(err) {
                    logger.error(err.responseText);
                });
        }

        function selectAll(lists) {
            ManageTrelloProject.openAllLists(lists);
        }

        function selectNone(lists) {
            ManageTrelloProject.closeAllLists(lists);
        }

        function activate() {
            logger.info('Manage project view activated');
            refreshBoards();
        }

        function refreshBoards() {
            ManageTrelloProject.refreshBacklogBoard(vmProject.backlog);
            ManageTrelloProject.refreshWorkingBoard(vmProject.working);
        }
    }
})();
