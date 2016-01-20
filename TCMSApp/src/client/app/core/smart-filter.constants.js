(function() {
    'use strict';

    angular.module('app.core')
        .constant('filterFields', filterFields());

    function filterFields() {
        return {
            runs: {
                getFields: getRunsFields,
                getFieldsOperators: getRunsFieldsOperators
            },
            defects: {
                getFields: getDefectsFields,
                getFieldsOperators: getDefectsOperators
            },
            tests: {
                getFields: getTestsFields,
                getFieldsOperators: getTestsOperators
            }
        };

        //required
        function getRunsFields() {
            return {
                'date': 'date',
                'name': 'name',
                'build': 'build',
                'env': 'envShort',
                'author': 'author',
                'status': 'status',
                'envFull': 'envFull'
            };
        }

        //oly for hints and optional
        function getRunsFieldsOperators() {
            return {
                'date': [':', '>', '<', '='],
                'name': [':', '='],
                'build': [':', '<', '>', '='],
                'env': [':', '='],
                'author': [':', '='],
                'status': [':', '='],
                'envFull': [':']
            };
        }

        function getDefectsFields() {
            return {
                'date': 'dateOfDefectCreation',
                'name': 'name',
                'priority': 'priority',
                'author': 'assignedTo',
                'found': 'whoFind'
            };
        }

        function getDefectsOperators() {
            return {
                'date': [':', '>', '<', '='],
                'name': [':', '='],
                'priority': [':', '='],
                'author': [':', '='],
                'found': [':', '=']
            };
        }

        function getTestsFields() {
            return {
                'date': 'created',
                'name': 'testName',
                'priority': 'casePriority',
                'creator': 'creator',
                'category': 'category',
                'sprint': 'caseSprint',
                'bugs': 'issues'
            };
        }

        function getTestsOperators() {
            return {
                'date': [':', '>', '<', '='],
                'name': [':', '='],
                'priority': [':', '='],
                'creator': [':', '='],
                'category': [':', '='],
                'sprint': [':', '>', '<', '='],
                'bugs':[':', '>', '<', '=']
            };
        }

    }
})();
