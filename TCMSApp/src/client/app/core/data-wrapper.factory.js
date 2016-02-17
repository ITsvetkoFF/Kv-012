(function () {
    'use strict';

    angular.module('app.core')
        .factory('dataWrapper', dataWrapper);

    dataWrapper.$inject = ['moment'];

    function dataWrapper(moment) {
        var service = {
            wrapRuns: wrapRuns
        };

        function wrapRuns(runs) {
            if (!angular.isArray(runs)) return [];

            var envFullToString = function () {
                var result = '';
                var keys = Object.keys(this);
                for (var i = 0; i < keys.length; i++) {
                    result += keys[i] + ': ' + this[keys[i]] + '; ';
                }
                return result;
            };

            for (var i = 0; i < runs.length; i++) {
                runs[i].author.toString = function (type) {
                    if (this.lastName) {
                        if (type === 'short') return this.lastName + ' ' + this.firstName.slice(0, 1) + '.';
                        else return this.firstName + ' ' + this.lastName;
                    } else {
                        return this.fullName;
                    }
                };

                runs[i].date = {
                    value: runs[i].date,
                    toString: function () {
                        return moment(this.value).format('DD.MM.YY');
                    }
                };

                if (runs[i].envFull) {
                    Object.defineProperty(runs[i].envFull, 'toString', {
                        value: envFullToString,
                        enumerable: false
                    });
                }
            }

            return runs;
        }

        return service;
    }
})();
