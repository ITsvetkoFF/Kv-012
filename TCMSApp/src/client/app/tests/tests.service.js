(function () {
    'use strict';

    angular
        .module('app.tests')
        .service('TestsService', TestsService);

    TestsService.$inject = ['$resource', 'apiUrl'];

    function TestsService($resource, apiUrl) {
        var category = [
            {id: '0', name: 'Acceptance'},
            {id: '1', name: 'Accessibility'},
            {id: '2', name: 'Compatibility'},
            {id: '3', name: 'Destructive'},
            {id: '4', name: 'Functional'},
            {id: '5', name: 'Performance'},
            {id: '6', name: 'Regression'},
            {id: '7', name: 'Security'},
            {id: '8', name: 'Smoke & Sanity'},
            {id: '9', name: 'Usability'},
            {id: '10', name: 'Other'}
        ];
        var sprint = [1, 2, 3];

        return {
            getSuites: function() {
                return $resource(apiUrl.host + apiUrl.suites);
            },
            getTestsOfSuite: function(suiteID) {
                return $resource(apiUrl.host + apiUrl.suiteTests + '?query={"suite" : "' + suiteID + '"}');
            },
            getNumDefects: function(testID) {
                return $resource(apiUrl.host + apiUrl.defects + '/count?query={}');
            },
            getUsers: function () {
                return $resource(apiUrl.host + apiUrl.projects);
            },
            getSuiteTestResource: function(testID) {
                return $resource(apiUrl.host + apiUrl.suiteTests + '/' + testID);
            },
        };
    }

})();
