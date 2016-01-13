/* global toastr:false, moment:false, faker:false */
(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('moment', moment)
        .constant('faker', faker)
        .constant('filterFields', filterFields())

    function filterFields(){
        return {
            runs: {
                getFields: getRunsFields,
                getFieldsOperators: getRunsFieldsOperators
            }
        };

        //required
        function getRunsFields(){
            return {
                "date": "date",
                "name": "name",
                "build": "build",
                "environment": "envShort",
                "env": "envShort",
                "author": "author",
                "status": "status",
                "envFull": "envFull",
                "env full": "envFull"
            };
        }

        //oly for hints and optional
        function getRunsFieldsOperators(){
            return{
                "date": [':', '>', '<', '='],
                "name": [':', '='],
                "build": [':', '<', '>', '='],
                "environment": [':', '='],
                "env": [':', '='],
                "author": [':', '='],
                "status": [':', '='],
                "envFull": [':'],
                "env full": [':']
            }
        }
    }
})();
