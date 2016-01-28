(function () {
    'use strict';

    angular
        .module('app.runs')
        .factory('RunsApiService', RunsApiService);

    RunsApiService.$inject = ['$resource', 'apiUrl'];

    function RunsApiService($resource, apiUrl) {

        return {
            getRuns: function () {
                return $resource(apiUrl.host + apiUrl.runs + '/:id', {id: '@id'});
            },
            getTestsOfRun: function (runID) {
                return $resource(apiUrl.host + apiUrl.runTests + '?query={"run" : "' + runID + '"}');
            },
            getSuite: function (suiteID) {
                return $resource(apiUrl.host + apiUrl.suites + '/' + suiteID);
            }

        };
    }

})
();
