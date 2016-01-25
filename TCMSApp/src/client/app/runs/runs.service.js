(function () {
    'use strict';

    angular
        .module('app.runs')
        .factory('RunsApiService', RunsApiService);

    RunsApiService.$inject = ['$resource', 'apiUrl'];

    function RunsApiService($resource, apiUrl) {

        return $resource(apiUrl.host + apiUrl.runs + '/:id', {id: '@id'});

    }

})();
