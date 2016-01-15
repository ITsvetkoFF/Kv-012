/* global toastr:false, moment:false, faker:false */
(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('moment', moment)
        .constant('Trello', Trello)
        .constant('faker', faker)
        .constant('apiUrl', apiUrl());

    function apiUrl() {
        return {
            host: 'http://localhost:3000',
            defects: '/api/v1/Defects',
            runs: '/api/v1/Runs',
            projects: '/api/v1/Projects',
            suites: '/api/v1/Suites',
            users: '/api/v1/Users'
        };
    }
})();
