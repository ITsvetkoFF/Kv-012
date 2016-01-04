(function () {
    'use strict';

    angular
        .module('app.tests')
        .controller('TestsCreateController', TestsCreateController);

    TestsCreateController.$inject = ['logger', 'FakeTestsFactory', '$uibModal'];
    /* @ngInject */
    function TestsCreateController(logger, FakeTestsFactory, $uibModal) {
        var vm = this;

        activate();

        vm.stepList = [1,2];
        vm.addStep = addStep;
        vm.delStep = delStep;

        function activate() {
            logger.info('Activated New Case View');
        }

        function addStep(){
            var stepCount = vm.stepList.length;
            vm.stepList.push(stepCount + 1);
        }

        function delStep($index) {
            vm.stepList.splice($index,1);
            console.log($index);
        }

    }

})();
