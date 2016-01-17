/* global Trello:false, moment:false, faker:false */
(function() {
    //'use strict';

    if (typeof Trello == 'undefined') Trello = 'Very simple stub. Kids, do not do things like that'; // jshint ignore:line

    angular
        .module('app.core')
        .constant('moment', moment)
        .constant('Trello', Trello) // KEEP AN EYE! Trello is exposed by client.js from index file
        .constant('faker', faker);
})();
