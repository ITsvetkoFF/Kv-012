(function () {
    'use strict';

    angular
        .module('app.tests')
        .service('TestsService', TestsService);

    TestsService.$inject = ['FakeTestsFactory'];

    function TestsService(FakeTestsFactory) {
        var suites = FakeTestsFactory(10); 
        var currentSuite = suites[0];

        return {
            getCurrentSuite: function () {
                return currentSuite;
            },
            setCurrentSuite: function(value) {
                currentSuite = value;
            },
            getFakeSuites: function() {
                return suites;
            }
        }

    }

})();
