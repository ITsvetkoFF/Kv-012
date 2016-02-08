(function () {
    'use strict';

    angular
        .module('app.defects')
        .controller('DefectsController', DefectsController);

    DefectsController.$inject = ['logger', '$uibModal', '$state', '$resource', 'apiUrl', 'filterFields'];
    /* @ngInject */
    function DefectsController(logger, $uibModal, $state, $resource, apiUrl, filterFields) {
        var vm = this;
        var defectsInfo = $resource(apiUrl.defects + '/?populate=reporter', {}, {});
        vm.arrayDefects = [];
        vm.statusMessage = 'Loading defects...';
        vm.countOfDefects = -1;
        vm.filterFields = filterFields.defects.getFields();

        updateDefects();
        function updateDefects() {
            defectsInfo.query(function(resp) {
                vm.countOfDefects = resp.length;
                vm.arrayDefects = resp;
                vm.toogledAll = false;
                if (vm.arrayDefects.length > 0) {
                    vm.currentDefect = vm.arrayDefects[0];
                    vm.setCurrentDefect = function (x) {
                        vm.currentDefect = x;
                    };
                } else {
                    vm.statusMessage = 'There are no defects';
                    vm.currentDefect = null;
                }

            });
        }

        vm.previousState = $state.$current.name;
        activate();

        function activate() {
            logger.info('Activated Defects View');
        }
    }
})();
