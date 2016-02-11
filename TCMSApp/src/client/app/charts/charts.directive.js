(function() {
    'use strict';

    angular.module('app.charts')
        .directive('chart', chartDirective);

    chartDirective.$inject = ['$compile', 'dataservice', 'dataWrapper'];

    function chartDirective($compile, dataservice, dataWrapper) {
        return {
            link: {pre: link},
            scope: {
                board: '@',
                type: '@',
                array: '@',
                field: '@'
            }
        };

        function link(scope, elem) {
            dataservice.getRuns().query({}, function(data) {
                scope.data = dataWrapper.wrapRuns(data);
            });
            var chart = $compile('<div edit-tool></div>')(scope);
            elem.append(chart);

            scope.$watch('type', function(newVal) {
                var prevChart = elem.find('#' + scope.board);
                prevChart.remove();
                var chart = $compile('<' + newVal + '-chart id=' + scope.board + '></' + newVal + '-chart>')(scope);
                if (scope.showEditTool) {
                    chart.toggleClass('blurred');
                }
                elem.append(chart);
            });

            scope.$watch('array', function(newVal) {
                switch (newVal) {
                    case 'runs':
                        dataservice.getRuns().query({}, function(data) {
                            scope.source = dataWrapper.wrapRuns(data);
                        });
                        break;
                    case 'suites':
                        dataservice.getSuites().query({}, function(data) {
                            scope.source = data;
                        });
                        break;
                }
            });

            scope.updateField = function(that) {
                scope.field = that.key;
            };
        }
    }

})();
