(function() {
    'use strict';

    angular.module('app.charts')
        .directive('barChart', chartDirective);

    chartDirective.$inject = ['d3'];

    function chartDirective(d3) {
        return {
            template: '<svg></svg>',
            link: link
        };

        function link(scope, elem) {
            var data, dataField, barSizes, marks;
            var space = 20;
            var barSpace = 5;
            var chartWidth = 300;
            var chartHeight = 320;
            var svgElem = d3.select(elem[0]).select('svg');
            var group = svgElem.append('g');
            var chart = group.selectAll('rect');
            var marksText = group.selectAll('text');
            var colors = ['#9E0041', '#C32F4B', '#E1514B', '#F47245', '#eeb763', '#e5cf73',
                '#d0c865', '#a4c57b', '#9CD6A4', '#6CC4A4', '#4D9DB4', '#4776B4', '#5E4EA1', '#7E4E81'];

            function updateChart() {
                if (!data) return;
                marks = [];
                barSizes = [];
                chart = chart.data([]);
                marksText = marksText.data([]);
                marksText.exit().remove();
                chart.exit().remove();
                for (var i = 0; i < data.length; i++) {
                    var markIndex = marks.indexOf(data[i][dataField].toString());
                    if (markIndex === -1) {
                        marks.push(data[i][dataField].toString());
                        barSizes.push(1);
                    } else {
                        barSizes[markIndex]++;
                    }
                }

                var barWidth = (chartWidth + barSpace) / barSizes.length - barSpace;
                var barScale = d3.scale.linear().domain([0, d3.max(barSizes)]).range([0, chartHeight]);
                chart = chart.data(barSizes);
                chart.exit().remove();
                chart.enter().append('rect').attr({
                    width: barWidth,
                    height: function(d) {
                        return barScale(d);
                    },
                    x: function(d, i) {
                        return i * (barWidth + barSpace);
                    },
                    y: function(d) {
                        return chartHeight - barScale(d);
                    },
                    fill: function(d, i)
                    {
                        return colors[i];
                    }
                });

                marksText = marksText.data(barSizes);
                marksText.exit().remove();
                marksText.enter().append('text').attr({
                    x: function (d, i) {
                        return ((chartWidth + barSpace) / barSizes.length) * i +
                            (chartWidth - barSpace * (barSizes.length - 1)) / barSizes.length / 2;
                    },
                    'font-size': (barWidth / 2 > 24 ? 24 : barWidth / 3) + 'px',
                    'font-weight': 400
                }).text(function(d, i) {
                    return marks[i];
                });

                marksText.attr({
                    y: function (d, i) {
                        if (this.clientWidth + (barWidth / 2 > 24 ? 24 : barWidth / 3) > barScale(barSizes[i]))
                            return chartHeight - barScale(barSizes[i]);
                        else return chartHeight - 2;
                    },
                    transform: function(d, i) {
                        return 'rotate(-90, ' + (((chartWidth + barSpace) / barSizes.length) * i +
                            (chartWidth - barSpace * (barSizes.length - 1)) / barSizes.length / 2) + ', ' +
                            (this.clientWidth + (barWidth / 2 > 24 ? 24 : barWidth / 3) > barScale(barSizes[i]) ?
                            chartHeight - barScale(barSizes[i]) - 5 : chartHeight - 5) + ')';
                    },
                    fill: function (d, i) {
                        if (this.clientWidth + (barWidth / 2 > 24 ? 24 : barWidth / 3) > barScale(barSizes[i]))
                            return colors[i];
                        else return '#fff';
                    }
                });

                updateSize();
            }

            function updateSize() {
                var svgRect = svgElem[0][0].getBoundingClientRect();
                var svgWidth = svgRect.width;
                var svgHeight = svgRect.height;
                var groupScale = group[0][0].getBBox();
                var k = Math.min((svgWidth - 2 * space) / groupScale.width,
                    (svgHeight - 2 * space) / groupScale.height);
                var newX = ((svgWidth - 2 * space) / k - groupScale.width) / 2 - groupScale.x + space / k;
                var newY = ((svgHeight - 2 * space) / k - groupScale.height) / 2 - groupScale.y + space / k;

                group.attr('transform', 'scale(' + k + ') translate(' + newX + ' ' + newY + ')');
            }

            scope.$on(scope.board, function() {
                updateSize();
            });

            scope.$on('gridster-item-transition-end', function() {
                updateSize();
            });

            scope.$watch('data', function(newVal) {
                if (newVal) {
                    data = newVal;
                    dataField = 'author';
                    updateChart();
                }
            });

            scope.$watch('field', function(newVal) {
                if (newVal) {
                    data = scope.source;
                    dataField = newVal;
                    updateChart();
                }
            });

        }
    }
})();
