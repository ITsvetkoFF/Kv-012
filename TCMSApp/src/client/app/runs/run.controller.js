(function() {
    'use strict';

    angular
        .module('app.runs')
        .controller('RunController', RunController);

    RunController.$inject = [];

    function RunController() {
        var vm = this;
    }
})();
