(function () {
    'use strict';

    angular.module('app.layout')
        .factory('sidebarFactory', sidebarFactory);

    sidebarFactory.$inject = ['moment'];

    function sidebarFactory(moment) {

        return {
            findProjectsNames: findProjectsNames,
            addProject: addProject
        };

        // Returns all proects names from LocalStorage
        function findProjectsNames() {
            var i, names = [], l = localStorage.length;

            for (i = 0; i < l; i++) {
                if (localStorage.key(i).indexOf('project') + 1) {
                    var proj = JSON.parse(localStorage.getItem(localStorage.key(i)));
                    name = proj.name;
                    names.push(name);
                }
            }
            return names;
        }

        // Adds project to LocalStorage
        function addProject(projectName, projectDescription) {

            var project = {
                name: projectName,
                description: projectDescription,
                dateStart: moment(),
                dateEnd: new Date(),
                users: [],
                suites: []
            };

            localStorage.setItem('project-' + project.name, JSON.stringify(project));

        }

    }
})
();
