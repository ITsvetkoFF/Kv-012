(function () {
    'use strict';

    var core = angular.module('app.core');

    var config = {
        appErrorPrefix: '[TCMSApp Error] ',
        appTitle: 'TCMSApp'
    };

    core.value('config', config);

    core.config(configure);

    configure.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider', 'toastrConfig'];
    /* @ngInject */
    function configure($logProvider, routerHelperProvider, exceptionHandlerProvider, toastrConfig) {

        delete window.moment;
        delete window.faker;
        delete window.Trello;
        delete window.jQuery;
        delete window.$;
        delete window.d3;

        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        routerHelperProvider.configure({docTitle: config.appTitle + ': '});

        // toastr configuration
        angular.extend(toastrConfig, {
            positionClass: 'toast-bottom-right',
            timeOut: 1000
        });
    }
})();
