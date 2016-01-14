/* global toastr:false, moment:false, faker:false */
(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('moment', moment)
        .constant('faker', faker)
        .constant('Trello', Trello)
        .constant({
                hostURL: 'http://localhost:3000',
                defectsURL: '/api/v1/Defects',
                runsURL: '/api/v1/Runs',
                projectsURL: '/api/v1/Projects',
                suitesURL: '/api/v1/Suites',
                usersURL: '	/api/v1/Users'
        })
})();
