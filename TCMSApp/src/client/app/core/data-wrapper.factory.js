(function(){
    'use strict';

    angular.module('app.core')
        .factory('dataWrapper', dataWrapper);

    dataWrapper.$inject = ['moment'];

    function dataWrapper(moment){
        var service = {
            wrapRuns: wrapRuns
        };

        function wrapRuns(runs){
            if(!angular.isArray(runs)) return [];

            var envFullProto = {
                toString: function(){
                    var result = "";
                    var keys = Object.keys(this);
                    for(var i=0; i<keys.length; i++){
                        result += keys[i]+": "+this[keys[i]]+"; ";
                    }
                    return result;
                }
            };

            for(var i=0; i<runs.length; i++){
                runs[i].author.toString = function(type){
                    if(type === 'short')
                        return this.last+' '+this.first.slice(0,1)+'.';
                    return this.first+' '+this.last;
                };

                runs[i].date = {
                    value: runs[i].date,
                    toString: function () {
                        return moment(this.value).format('DD.MM.YY');
                    }
                };

                runs[i].envFull.__proto__ = envFullProto;
            }

            return runs;
        }

        return service;
    }
})();
