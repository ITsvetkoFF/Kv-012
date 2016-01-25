(function () {
    'use strict';

    angular
        .module('app.trello')
        .factory('createProjectFactory', createProjectFactory);

    createProjectFactory.$inject = ['Trello', 'logger', 'sidebarFactory', '$q', '$rootScope'];
    /* @ngInject */
    function createProjectFactory(Trello, logger, sidebarFactory, $q, $rootScope) {

        var current = {};
        var organizations = [];
        var trelloData = {};

        return {
            createProjAndOrg: createProjAndOrg
        };

        function createProjAndOrg(projectName, projectDescription) {

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

                        }).then(

                            function (res) {

                                logger.success(projectName + ' created', '', 'Project created');

                                trelloData.trelloOrganizationId = res.id;

                                sidebarFactory.addProject(projectName, projectDescription, trelloData);

                                deferred.resolve();

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

            function sameProjectExists(res, projectName) {
                return (res.filter(function(e) { return e.displayName === projectName; }).length > 0);
            }

            return deferred.promise;

        }
    }
})();

