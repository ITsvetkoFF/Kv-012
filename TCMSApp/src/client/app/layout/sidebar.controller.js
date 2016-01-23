(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$state', 'routerHelper', '$uibModal', 'moment', 'logger',
        'sidebarFactory', 'authservice', 'createProjectFactory', '$q', '$scope'];
    /* @ngInject */
    function SidebarController($state, routerHelper, $uibModal, moment, logger,
                               sidebarFactory, authservice, createProjectFactory, $q, $scope) {

        var vm = this;
        vm.open = openModalCreateProject;
        vm.projectsNames = [];

        sidebarFactory.findProjectsNames().then(function(data) {
            vm.projectsNames = data;
            if (data.length === 0) {
                logger.warning('Create the first project to start');
            } //else {TODO: here we will request current project from user object}
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

                                var Trello = authservice.authorize();

                                if (Trello.authorized()) {

                                    $q.when(
                                        createProjectFactory.createProjAndOrg(Trello, projectName, projectDescription)
                                    ).then(function (res) {
                                            sidebarFactory.findProjectsNames().then(function(data) {
                                                vm.projectsNames = data;

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
    }
})();
