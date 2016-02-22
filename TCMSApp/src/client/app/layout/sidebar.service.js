(function () {
    'use strict';

    angular.module('app.layout')
        .factory('sidebarFactory', sidebarFactory);

    sidebarFactory.$inject = ['moment', '$http', '$q', 'logger', 'user'];

    function sidebarFactory(moment, $http, $q, logger, user) {

        return {
            findProjects: findProjects,
            addProject: addProject,
            updateProject: updateProject
        };

        // Gets proects from DB
        function findProjects() {
            var deferred = $q.defer();
            var currentUser = user.id;
            if (user.trelloUserID !== undefined)
                currentUser = user.trelloUserID;

            function contains(a, obj) {
                if (a !== undefined) {
                    var i = a.length;
                    while (i--) {
                        if (a[i] === obj) {
                            return true;
                        }
                    }
                    return false;
                }
            }

            $http.get('/api/v1/Projects').success(function(projects) {
                var i, projectsList = [], project;
                for (i = 0; i < projects.length; i++) {
                    project = {};
                    project.users = projects[i].users;
                    project.admins = projects[i].admins;
                    if (contains(project.users, currentUser) || contains(project.admins, currentUser)) {
                        project.name = projects[i].name;
                        project.description = projects[i].description;
                        project.trelloOrganizationId = projects[i].trelloOrganizationId;
                        project.id = projects[i]._id;

                        projectsList.push(project);
                    }
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
