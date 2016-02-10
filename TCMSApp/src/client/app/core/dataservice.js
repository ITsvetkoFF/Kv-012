(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'exception', 'logger', 'user', '$resource', 'apiUrl'];
    /* @ngInject */
    function dataservice($http, $q, exception, logger, user, $resource, apiUrl) {
        var service = {
            getPeople: getPeople,
            getMessageCount: getMessageCount,
            getRuns: getRuns,
            getSuites: getSuites
        };

        return service;

        function getMessageCount() { return $q.when(72); }

        function getPeople() {
            return $http.get('/api/people')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getPeople')(e);
            }
        }

        function getRuns() {
            return $resource(apiUrl.host + apiUrl.runs + '/:id?query={"project": "' +
                user.currentProjectID + '"}&populate=author', {id: '@_id'});
        }

        function getSuites() {
            return $resource(apiUrl.host + apiUrl.suites + '/:id?query={"project": "' +
                user.currentProjectID + '"}');
        }
    }
})();
