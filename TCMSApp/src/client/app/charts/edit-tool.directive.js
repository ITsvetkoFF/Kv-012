(function() {
    'use strict';

    angular.module('app.charts')
        .directive('editTool', editToolDirective);

    function editToolDirective() {
        return {
            templateUrl: 'app/charts/edit-tool.html',
            link: link
        };

        function link(scope, elem) {
            elem.on('mouseenter', mouseenter);
            elem.on('mouseleave', mouseleave);

            function mouseenter() {
                elem.find('edit-button').css('opacity', '0.4');
            }

            function mouseleave() {
                elem.find('edit-button').css('opacity', '0');
            }

            scope.toggleEditTool = function() {
                scope.showEditTool = !scope.showEditTool;
                angular.element(elem[0].nextElementSibling).toggleClass('blurred');
            };
        }
    }
})();
