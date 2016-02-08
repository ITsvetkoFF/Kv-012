(function () {
    'use strict';

    angular
        .module('app.trello')
        .factory('createProjectFactory', createProjectFactory);

    createProjectFactory.$inject = ['Trello', 'logger', 'sidebarFactory', '$q', '$rootScope'];
    /* @ngInject */
    function createProjectFactory(Trello, logger, sidebarFactory, $q, $rootScope) {

        var trelloData = {};

        return {
            syncProjAndOrg: syncProjAndOrg,
            createProjAndOrg: createProjAndOrg
        };

        function syncProjAndOrg(Trello) {
            var synchronization = $q.all([
                Trello.get('members/me/organizations'), sidebarFactory.findProjects()
            ])
            .then(function(data) {
                var trelloRelatedOrganization = {}, trelloOrganizations = data[0], projects = data[1];

                //Check if there is related project on Trello and sync name/description
                projects.forEach(function(project) {
                    var data = {}, trelloOrganizationId = project.trelloOrganizationId;

                    trelloRelatedOrganization = trelloOrganizations.filter(
                        function(organization) {
                            return organization.id === trelloOrganizationId;
                        }
                    )[0];

                    if (trelloRelatedOrganization) {

                        if (trelloRelatedOrganization.displayName !== project.name) {
                            data.name = trelloRelatedOrganization.displayName;
                        }

                        if (trelloRelatedOrganization.desc !== project.description) {
                            data.description = trelloRelatedOrganization.desc;
                        }

                        if (data.name || data.description) {
                            sidebarFactory.updateProject(project.id, data);
                        }
                    }
                });
            });

            return synchronization;
        }

        function createProjAndOrg(Trello, projectName, projectDescription) {

            var deferred = $q.defer();

            function sameProjectExists(res, projectName) {
                return (res.filter(function(e) { return e.displayName === projectName; }).length > 0);
            }

            $q.all([Trello.get('members/me/organizations'), Trello.get('members/me')]).then(
                function (res) {
                    trelloData.myId = res[1]['id'];

                    if (sameProjectExists(res[0], projectName)) {
                        logger.error('Project with the same name already exists.', '', 'Error');
                    } else {

                        Trello.post('/organizations', {
                            name: projectName,
                            displayName: projectName,
                            desc: projectDescription
                        }).then(
                            function (res) {

                                trelloData.trelloOrganizationId = res.id;

                                sidebarFactory.addProject(projectName,
                                    projectDescription, trelloData).then(function(res) {
                                    logger.success('Project ' + projectName +
                                    ' created. Description: ' + projectDescription, '', 'Project created');

                                    deferred.resolve(trelloData.trelloOrganizationId);
                                });

                            },

                            function (err) {
                                logger.error('Project has not been created.', '', 'Error');
                                deferred.reject();
                            }
                        );
                    }
                },
                function () {
                    logger.error('Cannot connect to Trello.', '', 'Error');
                    deferred.reject();
                }
            );

            return deferred.promise;
        }
    }
})();

