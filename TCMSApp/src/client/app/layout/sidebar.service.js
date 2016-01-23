(function () {
    'use strict';

    angular.module('app.layout')
        .factory('sidebarFactory', sidebarFactory);

    sidebarFactory.$inject = ['moment', '$http', '$q', 'logger'];

    function sidebarFactory(moment, $http, $q, logger) {

        return {
            findProjectsNames: findProjectsNames,
            addProject: addProject
        };

        // Gets proects from DB
        function findProjectsNames() {

            var deferred = $q.defer();

            $http.get('/api/v1/Projects').success(function(projects) {
                var i, names = [];
                for (i = 0; i < projects.length; i++) {
                    names.push(projects[i].name);
                }

                deferred.resolve(names);
            });

            return deferred.promise;
        }

        // Adds project to DB
        function addProject(projectName, projectDescription, trelloData) {

            var project = {
                name: projectName,
                description: projectDescription,
                dateStart: moment(),
                dateEnd: new Date(),
                users: [],
                suites: [],
                trelloOrganizationId: trelloData.trelloOrganizationId
            };

            $http.post('/api/v1/Projects', project).success(function(project) {
                console.log('Project ' + project.name + ' added to DB.');
            });

        }

    }
})
();
