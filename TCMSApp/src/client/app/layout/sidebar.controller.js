(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$state', 'routerHelper', '$uibModal', 'moment', 'logger',
        'sidebarFactory', 'authservice', 'createProjectFactory'];
    /* @ngInject */
    function SidebarController($state, routerHelper, $uibModal, moment, logger,
                               sidebarFactory, authservice, createProjectFactory) {
        var vm = this;

        vm.projectsNames = sidebarFactory.findProjectsNames();

        vm.open = function () {
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
                                var Trello = authservice.authorize();
                                if (Trello.authorized()) {
                                    createProjectFactory.createProjAndOrg(Trello, projectName, projectDescription)
                                        .then(
                                            function (res) {
                                                changeModal();
                                                vm.projectsNames = sidebarFactory.findProjectsNames();
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
        };
    }
})();
