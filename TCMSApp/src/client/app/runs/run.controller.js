/**
 * @ngdoc controller
 * @name runController
 * @memberOf app.runs
 * @description Controls current run view
 */

(function() {
    'use strict';

    angular
        .module('app.runs')
        .controller('RunController', RunController);

    RunController.$inject = [];

    function RunController() {
        /**
         * Bind view model as "vm"
         * @memberOf runController
         * @type {RunController}
         */
        var vm = this;

    }
})();
