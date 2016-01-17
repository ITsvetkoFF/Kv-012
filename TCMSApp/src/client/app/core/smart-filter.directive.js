(function() {
    'use strict';

    angular.module('app.core')
        .directive('smartFilter', smartFilterDirective);

    smartFilterDirective.$inject = ['filterFields'];

    function smartFilterDirective(filterFields) {
        return {
            restrict: 'E',
            controller: controller,
            templateUrl: 'app/core/smart-filter.html',
            scope: {
                fastQueries: '='
            }
        };

        function controller($scope, $element, $attrs) {
            var fields = filterFields[$attrs.type].getFields();
            var operatorsFun = filterFields[$attrs.type].getFieldsOperators;
            var fieldsOperators = (operatorsFun ? operatorsFun() : [':', '>', '<', '=']);
            var hintsFilterQuery = '';
            var skipLength = 0;
            var keys = Object.keys(fields);
            var fieldOperators;
            var inputElement = $element.find('INPUT')[0];
            $scope.hintKeys = Object.keys(fields);
            $scope.inputFormatter = inputFormatter;
            $scope.fastFilter = fastFilter;

            $scope.$parent.$watch('filterQuery', queryChanged);

            /**
             * function for setting query selected in dropdown
             * @param query - query for filtering
             */
            function fastFilter(query) {
                inputElement.value = '';
                $scope.$parent.filterQuery = query;
            }

            /**
             * adds new key to input element instead of replacing existing
             * @param $model - new key
             * @returns {*}
             */
            function inputFormatter($model) {
                $model = $model || '';
                return inputElement.value.substring(0, skipLength) + $model;
            }

            /**
             * function for generation array of hints when query is changed
             */
            function queryChanged() {
                var result = [];
                var skip = inputElement.value.match(/.*[:><=] *[^:><=]+ /);
                skipLength = (skip ? skip[0].length : 0);
                hintsFilterQuery = inputElement.value.substring(skipLength);

                if (hintsFilterQuery.length === 1) {
                    $scope.hintKeys = keys;
                    return;
                }

                for (var i = 0; i < keys.length; i++) {
                    if (keys[i].indexOf(hintsFilterQuery) !== -1) {
                        if (keys[i] === hintsFilterQuery) {
                            fieldOperators = fieldsOperators[keys[i]];
                            for (var j = 0; j < fieldOperators.length; j++) {
                                result.push(keys[i] + fieldOperators[j]);
                            }
                        }else {
                            result.push(keys[i]);
                        }
                    }
                }
                $scope.hintKeys = result;
            }

        }
    }
})();
