(function () {
    'use strict';

    angular
        .module('app.trello')
        .factory('createProjectFactory', createProjectFactory);

    createProjectFactory.$inject = ['Trello', 'logger', 'sidebarFactory', '$q', '$rootScope', 'ManageTrelloProject'];
    /* @ngInject */
    function createProjectFactory(Trello, logger, sidebarFactory, $q, $rootScope, ManageTrelloProject) {

        var current = {};
        var organizations = [];

        return {
            createProjAndOrg: createProjAndOrg,
            setCurrentProject: setCurrentProject,
            getCurrentProject: getCurrentProject
        };

        function createProjAndOrg(Trello, projectName, projectDescription, createDefaultDashboards) {

            var deferred = $q.defer();

            Trello.get('members/me/organizations').then(
                function (res) {

                    if (sameProjectExists(res, projectName)) {
                        logger.error('Project with the same name already exists.', '', 'Error');
                    }
                    else {

                        Trello.post('/organizations', {
                            name: projectName,
                            displayName: projectName,
                            desc: projectDescription

                        }).then(function (res) {
                                logger.success(
                                    'Project ' + projectName + ' created. Description: ' + projectDescription,
                                    '',
                                    'Project created'
                                );

                                if (createDefaultDashboards) {
                                    setDefaultContents(res);
                                }

                                sidebarFactory.addProject(projectName, projectDescription, res);

                                deferred.resolve();
                            },
                            function (err) {
                                logger.error('Project has not been created.', '', 'Error');
                                deferred.reject();
                            });
                    }
                },
                function () {
                    logger.error('Cannot connect to Trello.', '', 'Error');
                    deferred.reject();
                }
            );

            function sameProjectExists(res, projectName) {
                return (res.filter(function (e) {
                    return e.displayName === projectName;
                }).length > 0);
            }

            return deferred.promise;

        }

        function setCurrentProject(name) {
            current.name = name;
            $rootScope.$broadcast('CurrentProjectChanged');
        }

        function getCurrentProject() {
            return JSON.parse(localStorage.getItem('project-' + current.name));
        }

        function setDefaultContents(organization) {

            var backlog, working, bLists, wLists, labels
                , idOrganization = organization.id;

            backlog = new ManageTrelloProject.Board('Backlog');
            working = new ManageTrelloProject.Board('Working');

            bLists = [
                new ManageTrelloProject.List(backlog.name + ' - Defects'),
                new ManageTrelloProject.List(backlog.name + ' - Enhancements'),
                new ManageTrelloProject.List(backlog.name + ' - Tests'),
                new ManageTrelloProject.List(backlog.name + ' - Ideas')
            ];
            wLists = [
                // only one because there are also default lists: To Do, Doing, Done
                new ManageTrelloProject.List('To be tested')
                //new ManageTrelloProject.List(working.name + ' - To do'),
                //new ManageTrelloProject.List(working.name + ' - In progress'),
                //new ManageTrelloProject.List(working.name + ' - Done')
            ];
            labels = [
                new ManageTrelloProject.Label('critical', 'red'),
                new ManageTrelloProject.Label('high', 'orange'),
                new ManageTrelloProject.Label('medium', 'yellow'),
                new ManageTrelloProject.Label('low', 'blue'),
                new ManageTrelloProject.Label('success', 'green')
            ];

            for (var i = 0; i < bLists.length; i++) {
                backlog.lists.push(bLists[i]);
            }
            for (var i = 0; i < wLists.length; i++) {
                working.lists.push(wLists[i]);
            }
            for (var i = 0; i < labels.length; i++) {
                backlog.labels.push(labels[i]);
                working.labels.push(labels[i]);
            }

            ManageTrelloProject.addBoard(backlog, idOrganization);
            ManageTrelloProject.addBoard(working, idOrganization);
        }
    }
})();

