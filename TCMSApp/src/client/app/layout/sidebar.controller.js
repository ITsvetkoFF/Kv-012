(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$uibModal', 'moment', 'logger',
        'sidebarFactory', 'authservice', 'createProjectFactory', '$q', '$scope', 'ManageTrelloProject'];
    /* @ngInject */
    function SidebarController($uibModal, moment, logger,
                               sidebarFactory, authservice, createProjectFactory, $q, $scope, ManageTrelloProject) {

        var vm = this;
        vm.open = openModalCreateProject;
        vm.projectsNames = [];

        sidebarFactory.findProjectsNames().then(function (data) {
            vm.projectsNames = data;
            if (data.length === 0) {
                logger.error('Create the first project to start');
            } //else {TODO: here we will request current project from user object}
        });

        function openModalCreateProject() {
            var modalCreateProject = $uibModal.open({
                    templateUrl: 'app/layout/add-project.html',
                    controller: function ($uibModalInstance) {

                        var vmModal = this;
                        vmModal.createProjAndOrg = createProjAndOrg;
                        vmModal.dismiss = modalCreateProject.dismiss;

                        // data for trello boards creation
                        vmModal.backlogLists = ManageTrelloProject.getBacklogLists();
                        vmModal.workingLists = ManageTrelloProject.getWorkingLists();
                        vmModal.outputBacklogList = vmModal.backlogLists;
                        vmModal.outputWorkingList = vmModal.workingLists;

                        // Function creates Project and Trello Organization
                        function createProjAndOrg() {
                            var projectName = vmModal.projectName,
                                projectDescription = vmModal.projectDescription;

                            if (projectName !== '')
                                createOrganization(projectName, projectDescription);
                            else logger.error('Please fill the project name.');

                            function createOrganization(projectName, projectDescription) {

                                var Trello = authservice.authorize();

                                if (Trello.authorized()) {

                                    createProjectFactory.createProjAndOrg(Trello, projectName, projectDescription)
                                        .then(function (res) {

                                            setCustomContent(res, vmModal.outputBacklogList,
                                                vmModal.outputWorkingList);

                                            sidebarFactory.findProjectsNames().then(function (data) {
                                                vm.projectsNames = data;

                                                changeModal();
                                            });
                                        }, function (err) {
                                            logger.error('New project has not been created.');
                                        });
                                }
                            }
                        }

                        function changeModal() {
                            modalCreateProject.dismiss();

                            var modalProjectCreated = $uibModal.open({
                                templateUrl: 'app/layout/project-added.html',
                                controller: function () {

                                    var vmSidebarModal = this;

                                    vmSidebarModal.exit = function () {
                                        modalProjectCreated.dismiss();
                                    };
                                },
                                controllerAs: 'vmSidebarModal'
                            });
                        }
                    },
                    controllerAs: 'vmModal'
                }
            );
        }

        function setCustomContent(organization, outputBacklogList, outputWorkingList) {
            var backlog, working, bLists, wLists, idOrganization = organization.id;

            backlog = new ManageTrelloProject.Board('Backlog');
            working = new ManageTrelloProject.Board('Working');

            bLists = [];
            wLists = [];
            var newList;

            for (var i = 0; i < outputBacklogList.length; i++) {
                newList = new ManageTrelloProject.List(outputBacklogList[i].name);
                newList.closed = !outputBacklogList[i].ticked;
                bLists.push(newList);
            }
            for (i = 0; i < outputWorkingList.length; i++) {
                newList = new ManageTrelloProject.List(outputWorkingList[i].name);
                newList.closed = !outputWorkingList[i].ticked;
                wLists.push(newList);
            }
            for (i = 0; i < bLists.length; i++) {
                backlog.lists.push(bLists[i]);
            }
            for (i = 0; i < wLists.length; i++) {
                working.lists.push(wLists[i]);
            }

            ManageTrelloProject.addBoard(backlog, idOrganization);
            ManageTrelloProject.addBoard(working, idOrganization);
        }
    }
})();
