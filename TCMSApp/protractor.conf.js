exports.config = {
    directConnect: true,

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'firefox'
    },

    // Framework to use. Jasmine is recommended.
    framework: 'jasmine',

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['src/e2e/create-project.e2e.spec.js'],

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};
