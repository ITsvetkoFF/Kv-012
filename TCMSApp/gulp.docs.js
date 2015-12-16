module.exports = function() {

    var config = 'node_modules/jsdoc/jsdoc.js '+
        '-c node_modules/angular-jsdoc/common/conf.json '+   // config file
        '-t node_modules/angular-jsdoc/angular-template '+   // template file
        '-d build/docs '+                           // output directory
        './README.md ' +                            // to include README.md as index contents
        '-r src';                 // source code directory

    return config;
};
