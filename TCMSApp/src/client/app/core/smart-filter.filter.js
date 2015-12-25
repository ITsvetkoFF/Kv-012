
(function(){

    'use strict';

    angular.module('app.core')
        .filter('smartFilter', smartFilter);

    function smartFilter(){
        return function(input, query, fields){
            if(!query || !angular.isArray(input)){
                return input;
            }

            var result = [];
            var regExp = "[:><=](";
            var keys = Object.keys(fields);

            for(var i=0; i<keys.length; i++){
                regExp = keys[i]+"|"+regExp+"[^:><=]+(?="+keys[i]+")|";
            }

            regExp = regExp+"[^:><=]+$)";
            var regExpObj = new RegExp(regExp, "g");
            var segments = query.match(regExpObj);

            if(segments === null) return input;

            runsRow: for(i=0; i<input.length; i++){
                for(var j=0; j<(segments.length-1)/2; j++){
                    if(String(input[i][fields[segments[j*2]]]).indexOf(segments[j*2+1].substring(1)) === -1){
                        continue runsRow;
                    }
                }
                result.push(input[i]);
            }

            return result;
        }
    }

})();
