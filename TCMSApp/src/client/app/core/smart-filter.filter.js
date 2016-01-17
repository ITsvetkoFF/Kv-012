
(function() {

    'use strict';

    angular.module('app.core')
        .filter('smartFilter', smartFilter);

    smartFilter.$inject = ['moment'];

    function smartFilter(moment) {
        return function(rows, query, fields) {
            if (!query || !fields || !angular.isArray(rows)) {
                return rows;
            }

            var result = [];
            var regExp = '[:><=](';
            var keys = Object.keys(fields);

            for (var i = 0; i < keys.length; i++) {
                regExp = keys[i] + '|' + regExp + '[^:><=]+(?=' + keys[i] + ')|';
            }

            regExp += '[^:><=]+$)';
            var regExpObj = new RegExp(regExp, 'g');
            var segments = query.match(regExpObj);

            if (segments === null) return rows;

            var parseDate = function(input) {
                switch (input){
                    case 'year ago':
                        return moment().subtract(1, 'year');
                    case 'month ago':
                        return moment().subtract(1, 'month');
                    case 'week ago':
                        return moment().subtract(1, 'week');
                    case 'day ago':
                        return moment().subtract(1, 'day');
                    default:
                        return moment(input, 'DD.MM.YY');
                }
            };

            row: for (i = 0; i < rows.length; i++) {
                for (var j = 0; j < (segments.length - 1) / 2; j++) {
                    var realValue = rows[i][fields[segments[j * 2]]];
                    var expValue = segments[j * 2 + 1].substring(1).trim();

                    switch (segments[j * 2 + 1][0]) {
                        case ':':
                            if (fields[segments[j * 2]] === 'date') {
                                expValue = moment(parseDate(expValue)).format('DD.MM.YY'.substring(0, expValue.length));
                            }
                            if (String(realValue).indexOf(expValue) === -1) {
                                continue row;
                            }
                            break;
                        case '=':
                            if (fields[segments[j * 2]] === 'date') {
                                expValue = moment(parseDate(expValue)).format('DD.MM.YY'.substring(0, expValue.length));
                            }
                            if (String(realValue) !== expValue) {
                                continue row;
                            }
                            break;
                        case '<':
                            if (fields[segments[j * 2]] === 'date') {
                                expValue = parseDate(expValue)._d;
                                realValue = moment(realValue.value)._d;
                            }
                            if (!isNaN(realValue) && realValue >= expValue) {
                                continue row;
                            }
                            break;
                        case '>':
                            if (fields[segments[j * 2]] === 'date') {
                                expValue = parseDate(expValue)._d;
                                realValue = moment(realValue.value)._d;
                            }
                            if (!isNaN(realValue) && realValue <= expValue) {
                                continue row;
                            }
                            break;
                    }
                }
                result.push(rows[i]);
            }

            return result;
        };
    }

})();
