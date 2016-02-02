(function () {
    'use strict';

    angular
        .module('app.core', [
            'ngAnimate', 'ngSanitize', 'ngResource',
            'blocks.exception', 'blocks.logger', 'blocks.router',
            'ui.router', 'ngplus', 'ui.bootstrap', 'app.fakers', 'app.apis'
        ]);
})();
