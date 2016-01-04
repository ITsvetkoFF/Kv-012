(function () {
    'use strict';

    angular
        .module('app.tests')
        .service('TestsService', TestsService);

    function TestsService() {
        var currentSuite = {};

        return {
            getCurrentSuite: function () {
                return currentSuite;
            },
            setCurrentSuite: function(value) {
                currentSuite = value;
            }
        }

    }

})();
