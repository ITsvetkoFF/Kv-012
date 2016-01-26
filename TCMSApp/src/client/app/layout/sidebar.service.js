(function () {
    'use strict';

    angular.module('app.layout')
        .factory('sidebarFactory', sidebarFactory);

    sidebarFactory.$inject = ['moment', '$http', '$q', 'logger'];

    function sidebarFactory(moment, $http, $q, logger) {

        return {
            findProjects: findProjects,
            addProject: addProject,
            updateProject: updateProject
        };

        // Gets proects from DB
        function findProjects() {

            var deferred = $q.defer();

            $http.get('/api/v1/Projects').success(function(projects) {
                var i, projectsList = [], project;
                for (i = 0; i < projects.length; i++) {
                    project = {};

                    project.name = projects[i].name;
                    project.description = projects[i].description;
                    project.trelloOrganizationId = projects[i].trelloOrganizationId;
                    project.id = projects[i]._id;

                    projectsList.push(project);
                }

                deferred.resolve(projectsList);
            });

            return deferred.promise;
        }

        // Adds project to DB
        function addProject(projectName, projectDescription, trelloData) {

            var deferred = $q.defer();

            var project = {
                name: projectName,
                description: projectDescription,
                dateStart: moment(),
                dateEnd: new Date(),
                admins: [trelloData.myId],
                users: [],
                suites: [],
                trelloOrganizationId: trelloData.trelloOrganizationId
            };

            $http.post('/api/v1/Projects', project).success(function(project) {
                logger.success('Project ' + project.name + ' added to DB.');
                deferred.resolve(project);
            });

            return deferred.promise;
        }

        // Updates project in DB
        function updateProject(projectID, data) {

            $http.post('/api/v1/Projects/' + projectID, data).success(function(project) {
                logger.success('Project ' + project.name + ' synchronized with Trello.');
            });

        }

    }
})
();
