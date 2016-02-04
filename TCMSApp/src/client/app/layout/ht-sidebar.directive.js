(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('htSidebar', htSidebar);

    /* @ngInject */
    function htSidebar () {
        var directive = {
            bindToController: true,
            controller: SidebarController,
            controllerAs: 'vmSidebar',
            restrict: 'EA',
            replace: true,
            scope: {
                'sidebar': '='
            },
            templateUrl: 'app/layout/sidebar.html'
        };

        SidebarController.$inject = ['$uibModal', 'logger',
            'sidebarFactory', 'authservice', 'createProjectFactory', '$q', '$rootScope', 'user', '$http'];

        /* @ngInject */

        function SidebarController($uibModal, logger,
                sidebarFactory, authservice, createProjectFactory, $q, $rootScope, user, $http) {

            var vm = this;
            vm.open = openModalCreateProject;
            vm.synchronized = false;

            vm.setCurrentProject = setCurrentProject;

            var Trello = authservice.authorize();

            createProjectFactory.syncProjAndOrg(Trello).then(function (res) {
                sidebarFactory.findProjects().then(function(data) {
                    vm.projects = data;
                    if (data.length === 0) {
                        logger.error('Create the first project to start');
                    }
                    vm.synchronized = true;
                });
            });

            function openModalCreateProject () {
                var modalCreateProject = $uibModal.open({
                        templateUrl: 'app/layout/add-project.html',
                        controller: function ($uibModalInstance) {

                            var vmModal = this;
                            vmModal.createProjAndOrg = createProjAndOrg;

                            // Function creates Project and Trello Organization
                            function createProjAndOrg() {
                                var projectName = vmModal.projectName,
                                    projectDescription = vmModal.projectDescription;

                                if (projectName !== '')
                                    createOrganization(projectName, projectDescription);
                                else logger.error('Please fill the project name.');

                                function createOrganization(projectName, projectDescription) {

                                    if (Trello.authorized()) {

                                        createProjectFactory.createProjAndOrg(Trello,
                                            projectName, projectDescription).then(function (res) {

                                                sidebarFactory.findProjects().then(function(data) {
                                                    vm.projects = data;
                                                    changeModal();
                                                });
                                            },

                                            function (err) {
                                                logger.error('New project has not been created.');
                                            }
                                        );
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

            function setCurrentProject($event) {
                $event.preventDefault();
                var projectId = $event.target.id;

                user.changeCurrentProject(projectId);
            }
        }

        return directive;
    }
})();
