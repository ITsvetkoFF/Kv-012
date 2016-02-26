(function () {
    'use strict';

    angular
        .module('app.runs')
        .factory('RunsApiService', RunsApiService);

    RunsApiService.$inject = ['$resource', 'apiUrl', 'user'];

    function RunsApiService($resource, apiUrl, user) {
        var currentRun;

        return {
            currentRun: function(_currentRun) {
                if (!!_currentRun) {
                    currentRun = _currentRun;
                }

                return currentRun;
            },
            getRuns: function () {
                return $resource(apiUrl.host + apiUrl.runs + '/:id?query={"project": "' +
                user.currentProjectID + '"}&populate=author', {id: '@_id'});
            },
            getTestsOfRunResource: function (runID) {
                return $resource(apiUrl.host + apiUrl.runTests + '?query={"run" : "' + runID + '"}');
            },
            getSuite: function (suiteID) {
                return $resource(apiUrl.host + apiUrl.suites + '/' + suiteID);
            },
            getRunResource: function() {
                return $resource(apiUrl.host + apiUrl.runs + '/:id', {id: '@_id'});
            },
            RunTestResource: function () {
                return $resource(apiUrl.host + apiUrl.runTests + '/:id', {id: '@_id'});
            }
        };
    }

})
();
