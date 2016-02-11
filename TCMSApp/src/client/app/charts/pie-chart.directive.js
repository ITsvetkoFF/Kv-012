(function() {
    'use strict';

    angular.module('app.charts')
        .directive('pieChart', chartDirective);

    chartDirective.$inject = ['d3'];

    function chartDirective(d3) {
        return {
            template: '<svg></svg>',
            link: link
        };

        function link(scope, elem) {
            var data, dataField, sectorSizes, markings;
            var colors = ['#ffa900', '#5cb85c', '#f2f260', '#a39258', '#f97272', '#9875b7', '#67a490', '#5d76ba',
                '#98b357', '#af8d66', '#47a2e8', '#29cece', '#9E0041', '#C32F4B'];
            var chartSize = 110;
            var space = 20;
            var svgElem = d3.select(elem[0]).select('svg');
            var group = svgElem.append('g');
            var chart = group.selectAll('path.arc');
            var arcs = d3.svg.arc().outerRadius(chartSize / 2).innerRadius(0);
            var pie = d3.layout.pie().sort(null).value(function(d) {
                return d;
            });

            var linePoint = function(d, c) {
                var rad = 0.01745329252;
                var alpha = (arcs.startAngle()(d) + arcs.endAngle()(d)) / 2;
                var k = -1;
                if (alpha / rad > 90 && alpha / rad < 270) {
                    alpha = 180 * rad - alpha;
                    k = 1;
                }
                var b = c * Math.tan(alpha) / Math.sqrt(Math.pow(Math.tan(alpha), 2) + 1);
                var a = Math.sqrt(c * c - b * b);
                return [b, k * a];
            };

            function updatePieces() {
                var pieces = svgElem.selectAll('path.piece');
                pieces.data(pie(sectorSizes));
                pieces.attr({
                    d: arcs,
                    fill: function (d, i) {
                        return colors[i];
                    },
                    stroke: 'rgba(255,255,255,0.1)'
                });
            }

            function updateLines() {
                var lineGenerator = d3.svg.line().x(function(d) {
                    return d[0];
                }).y(function(d) {
                    return d[1];
                });
                var marks = svgElem.selectAll('text.mark');
                var lines = svgElem.selectAll('path.line');
                lines.data(pie(sectorSizes));
                lines.datum(function(d, i) {
                    var markSize = marks[0][i].getBBox();
                    return [
                        arcs.centroid(d),
                        linePoint(d, (chartSize * 1.2) / 2),
                        [linePoint(d, (chartSize * 1.2) / 2)[0] +
                        (linePoint(d, (chartSize * 1.2) / 2)[0] < 0 ? -1 : 1) * (markSize.width + 10),
                            linePoint(d, (chartSize * 1.2) / 2)[1]]
                    ];
                });
                lines.attr({
                    d: lineGenerator,
                    fill: 'none',
                    stroke: function(d, i) {
                        return colors[i];
                    },
                    'stroke-width': 1
                });
            }

            function updateMarks() {
                var marks = svgElem.selectAll('text.mark');
                marks.data(pie(sectorSizes));
                marks.text(function(d, i) {
                    return markings[i] + ' (' + sectorSizes[i] + ')'; }
                );
                marks.attr({
                    x: function(d, i) {
                        var markSize = marks[0][i].getBBox();
                        var x = linePoint(d, (chartSize * 1.2) / 2)[0];
                        return x + (x < 0 ? -markSize.width - 5 : 0) + (x < 0 ? 0 : 5);
                    },
                    y: function(d) {
                        return linePoint(d, (chartSize * 1.2) / 2)[1] - 3;
                    },
                    'font-weight': 400,
                    fill: '#444',
                    'font-size': chartSize * 0.09 + 'px'
                });
            }

            function updateChart() {
                if (!data) return;
                sectorSizes = [];
                markings = [];
                for (var i = 0; i < data.length; i++) {
                    var markIndex = markings.indexOf(data[i][dataField]);
                    if (markIndex === -1) {
                        markings.push(data[i][dataField]);
                        sectorSizes.push(1);
                    }else {
                        sectorSizes[markIndex]++;
                    }
                }

                chart = chart.data(pie(sectorSizes));
                chart.exit().remove();

                var newSectors = chart.enter().append('g').attr('class', 'sector');

                newSectors.append('path').attr('class', 'piece');
                updatePieces();
                newSectors.append('text').attr('class', 'mark');
                updateMarks();
                newSectors.append('path').attr('class', 'line');
                updateLines();
                updateMarks();

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
                    dataField = 'status';
                    updateChart();
                }
            });

            scope.$watch('field', function(newVal) {
                data = scope.source;
                dataField = newVal;
                updateChart();
            });

        }
    }

})();
