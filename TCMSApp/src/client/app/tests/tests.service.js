(function () {
    'use strict';

    angular
        .module('app.tests')
        .service('TestsService', TestsService);

    TestsService.$inject = ['FakeTestsFactory'];

    function TestsService(fakeTestsFactory) {
        var suites = fakeTestsFactory(10);
        var currentSuite = suites[0];
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
        var priority = [
            {id: '0', name: 'Critical'},
            {id: '1', name: 'High'},
            {id: '2', name: 'Medium'},
            {id: '3', name: 'Low'}
        ];
        var sprint = [1,2,3];

        return {
            getCurrentSuite: function () {
                return currentSuite;
            },
            setCurrentSuite: function(value) {
                currentSuite = value;
            },
            getFakeSuites: function() {
                return suites;
            },
            getPriority: function() {
                return priority;
            },
            getCategory: function() {
                return category;
            },
            getSprint: function() {
                return sprint;
            }
        };

    }

})();
