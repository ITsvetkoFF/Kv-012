(function() {
    'use strict';

    angular.module('app.core')
        .constant('filterFields', filterFields());

    function filterFields() {
        return {
            runs: {
                getFields: getRunsFields,
                getFieldsOperators: getRunsFieldsOperators
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
    }
})();
