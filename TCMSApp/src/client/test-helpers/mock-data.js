var mockData = (function () {
    return {
        getMockStates: getMockStates,
        getMockRuns: getMockRuns,
        getFilterDirectiveTmpl: getFilterDirectiveTmpl,
        getMockSuites: getMockSuites,
        getMockTests: getMockTests,
        getMockTestsOfSuite: getMockTestsOfSuite,
        getMockSteps: getMockSteps,
        getSidebarDirectiveTmpl: getSidebarDirectiveTmpl
    };

    function getMockStates() {
        return [
            {
                state: 'dashboard',
                config: {
                    url: '/',
                    templateUrl: 'app/dashboard/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }
        ];
    }

    function getMockRuns() {
        // Code here will be linted with JSHint.
        /* jshint ignore:start */
        return [
            {'_id':963499,'previousRunId':744753,'date':'2015-09-18T19:06:17.623Z','build':456,'author':{'first':'Camryn','last':'Schaefer'},'envShort':'Andr 4.3.1/Safari 8.0','envFull':{'OS':'Android 4.3.1 Jelly Bean','Browser':'Safari 8.0.8','CPU':'Intel Pentium 4405U (Skylake)','GPU':'AMD Radeon HD 7970M (GCN)'},'status':'passed','name':'Quaerat itaque'},
            {'_id':472936,'previousRunId':463358,'date':'2015-12-01T04:00:31.144Z','build':36,'author':{'first':'Frederik','last':'Pfeffer'},'envShort':'Win 10/Firefox 43','envFull':{'OS':'Windows 10','Browser':'Firefox 43.0.1','GPU':'Qualcomm Adreno 420'},'status':'failed','name':'Aliquam'},
            {'_id':6799,'previousRunId':86735,'date':'2015-02-23T23:34:45.733Z','build':939,'author':{'first':'Hermann','last':'Dach'},'envShort':'Win 8/Firefox 42','envFull':{'OS':'Windows 8','Browser':'Firefox 42.0','GPU':'Qualcomm Adreno 420'},'status':'failed','name':'Labore expedita'},
            {'_id':541022,'previousRunId':207149,'date':'2015-05-20T06:15:54.553Z','build':561,'author':{'first':'Alysa','last':'Braun'},'envShort':'Andr 5.1/Firefox 41','envFull':{'OS':'Android 5.1 Lollipop','Browser':'Firefox 41.0.2','CPU':'AMD A10-7300 (Kaveri)'},'status':'failed','name':'Accusamus'},
            {'_id':811533,'previousRunId':22690,'date':'2015-01-18T20:07:02.518Z','build':38,'author':{'first':'Kavon','last':'Gutkowski'},'envShort':'Win 8/Chrome 49','envFull':{'OS':'Windows 8','Browser':'Chrome 49.0','CPU':'Intel Core i7-4810MQ (Haswell)','GPU':'Qualcomm Adreno 320','Memory':'10GB'},'status':'failed','name':'Velit repellendus'},
            {'_id':889572,'previousRunId':169431,'date':'2015-08-17T14:37:35.811Z','build':258,'author':{'first':'Sabryna','last':'Fahey'},'envShort':'Win 8/Chrome 48','envFull':{'OS':'Windows 8','Browser':'Chrome 48.0.2564','CPU':'AMD Pro A12-8800B (Carrizo)','Memory':'8GB'},'status':'failed','name':'Vero'},
            {'_id':366177,'previousRunId':559158,'date':'2015-05-19T00:48:49.432Z','build':885,'author':{'first':'Yadira','last':'Funk'},'envShort':'Andr 6.0/Safari 9.0','envFull':{'OS':'Android 6.0 Marshmallow','Browser':'Safari 9.0.2','CPU':'AMD A10-7300 (Kaveri)','GPU':'NVIDIA GeForce GTX 470M SLI (Fermi)','Memory':'7GB'},'status':'failed','name':'Id'},
            {'_id':8696,'previousRunId':246432,'date':'2015-02-05T01:27:57.843Z','build':475,'author':{'first':'Daphney','last':'Murazik'},'envShort':'Win 8/Chrome 48','envFull':{'OS':'Windows 8','Browser':'Chrome 48.0.2564','GPU':'NVIDIA GeForce GTX 770M SLI (Kepler)','Memory':'15GB'},'status':'failed','name':'Dicta qui'},
            {'_id':609094,'previousRunId':661943,'date':'2015-04-14T11:50:52.379Z','build':6,'author':{'first':'Julie','last':'Kshlerin'},'envShort':'Andr 5.1/Safari 7.0','envFull':{'OS':'Android 5.1 Lollipop','Browser':'Safari 7.0.6','GPU':'ARM Mali-T760 MP8 (Midgard 3rd-gen)'},'status':'passed','name':'Tempore sit'},
            {'_id':710910,'previousRunId':119473,'date':'2015-09-02T01:03:06.111Z','build':671,'author':{'first':'Arch','last':'Gottlieb'},'envShort':'OS X 10.11/Chrome 46','envFull':{'OS':'OS X 10.11 EI Capitan','Browser':'Chrome 46.0.2490','Memory':'9GB'},'status':'passed','name':'Est'},
            {'_id':31077,'previousRunId':890297,'date':'2015-07-16T05:50:40.953Z','build':179,'author':{'first':'Brittany','last':'Dibbert'},'envShort':'Win 10/Chrome 47','envFull':{'OS':'Windows 10','Browser':'Chrome 47.0.2526','CPU':'Intel Pentium 4405U (Skylake)','GPU':'AMD Radeon HD 7970M (GCN)'},'status':'failed','name':'Recusandae aut'},
            {'_id':200454,'previousRunId':550618,'date':'2015-09-12T11:14:47.579Z','build':962,'author':{'first':'Marvin','last':'Turner'},'envShort':'Andr 6.0/Firefox 41','envFull':{'OS':'Android 6.0 Marshmallow','Browser':'Firefox 41.0.2','CPU':'Intel Core i7-2820QM (Sandy Bridge)','GPU':'ARM Mali-400 MP4'},'status':'failed','name':'Et enim'},
            {'_id':13674,'previousRunId':132510,'date':'2015-11-16T16:14:12.205Z','build':112,'author':{'first':'Bulah','last':'Hills'},'envShort':'Win 10/Chrome 48','envFull':{'OS':'Windows 10','Browser':'Chrome 48.0.2564','CPU':'AMD A10-7300 (Kaveri)','Memory':'9GB'},'status':'failed','name':'Quas aliquid'},
            {'_id':283917,'previousRunId':111080,'date':'2015-12-01T01:39:26.722Z','build':61,'author':{'first':'Alverta','last':'Schmitt'},'envShort':'OS X 10.11/Chrome 46','envFull':{'OS':'OS X 10.11 EI Capitan','Browser':'Chrome 46.0.2490','CPU':'Intel Core i7-4810MQ (Haswell)','GPU':'Qualcomm Adreno 320'},'status':'failed','name':'Aperiam voluptas'},
            {'_id':688460,'previousRunId':420383,'date':'2015-04-27T01:48:03.486Z','build':717,'author':{'first':'Hubert','last':'Williamson'},'envShort':'Andr 4.2.2/Chrome 47','envFull':{'OS':'Android 4.2.2 Jelly Bean','Browser':'Chrome 47.0.2526','CPU':'Intel Core i5-6300U (Skylake)'},'status':'passed','name':'Dolorem'},
            {'_id':311283,'previousRunId':571038,'date':'2015-02-01T22:59:14.649Z','build':446,'author':{'first':'Anya','last':'Gleason'},'envShort':'Win 8/Firefox 41','envFull':{'OS':'Windows 8','Browser':'Firefox 41.0.2','GPU':'NVIDIA GeForce GTX 770M SLI (Kepler)'},'status':'failed','name':'Consequatur quaerat'},
            {'_id':770676,'previousRunId':821282,'date':'2015-02-18T02:39:27.261Z','build':712,'author':{'first':'Shayna','last':'Tremblay'},'envShort':'Win 7/Chrome 46','envFull':{'OS':'Windows 7','Browser':'Chrome 46.0.2490'},'status':'failed','name':'Eum'},
            {'_id':914737,'previousRunId':216373,'date':'2015-05-11T10:13:36.984Z','build':503,'author':{'first':'Cara','last':'Heidenreich'},'envShort':'Andr 6.0/Safari 7.1','envFull':{'OS':'Android 6.0 Marshmallow','Browser':'Safari 7.1.8','Memory':'4GB'},'status':'failed','name':'Maiores'},
            {'_id':995644,'previousRunId':898547,'date':'2015-02-20T07:39:48.388Z','build':6,'author':{'first':'Tillman','last':'O\'Conner'},'envShort':'Win XP/Chrome 49','envFull':{'OS':'Windows XP','Browser':'Chrome 49.0','CPU':'Intel Core i7-2820QM (Sandy Bridge)','GPU':'Qualcomm Adreno 420','Memory':'6GB'},'status':'passed','name':'Perferendis'},
            {'_id':493960,'previousRunId':588931,'date':'2015-05-23T01:05:10.591Z','build':896,'author':{'first':'Glenna','last':'Ratke'},'envShort':'OS X 10.10/Firefox 41','envFull':{'OS':'OS X 10.10  Yosemite','Browser':'Firefox 41.0.2','CPU':'AMD A10-7300 (Kaveri)','GPU':'Qualcomm Adreno 420','Memory':'14GB'},'status':'failed','name':'Autem'},
            {'_id':342516,'previousRunId':440943,'date':'2015-04-10T22:46:42.225Z','build':489,'author':{'first':'Fae','last':'Blick'},'envShort':'Win 7/Chrome 46','envFull':{'OS':'Windows 7','Browser':'Chrome 46.0.2490','CPU':'AMD A10-7300 (Kaveri)','GPU':'Qualcomm Adreno 420','Memory':'8GB'},'status':'passed','name':'Id quas'},
            {'_id':915497,'previousRunId':65101,'date':'2015-05-11T20:25:02.807Z','build':107,'author':{'first':'Jalyn','last':'Russel'},'envShort':'Andr 4.4.4/Firefox 40','envFull':{'OS':'Android 4.4.4 KitKat','Browser':'Firefox 40.0.3','CPU':'Intel Pentium 4405U (Skylake)','Memory':'10GB'},'status':'failed','name':'Veniam'},
            {'_id':211289,'previousRunId':193617,'date':'2015-11-12T14:59:30.187Z','build':908,'author':{'first':'Chadd','last':'Feeney'},'envShort':'Win 8/Chrome 48','envFull':{'OS':'Windows 8','Browser':'Chrome 48.0.2564','CPU':'Intel Core i5-6300U (Skylake)'},'status':'failed','name':'Distinctio et'},
            {'_id':375927,'previousRunId':261828,'date':'2015-04-30T20:31:23.368Z','build':524,'author':{'first':'Grover','last':'Beahan'},'envShort':'Andr 4.4.4/Safari 7.1','envFull':{'OS':'Android 4.4.4 KitKat','Browser':'Safari 7.1.8','CPU':'Intel Core i7-2820QM (Sandy Bridge)','Memory':'3GB'},'status':'failed','name':'Vero fugiat'},
            {'_id':788863,'previousRunId':924171,'date':'2015-10-23T18:00:38.507Z','build':162,'author':{'first':'Cielo','last':'Lueilwitz'},'envShort':'OS X 10.11/Chrome 46','envFull':{'OS':'OS X 10.11 EI Capitan','Browser':'Chrome 46.0.2490','GPU':'NVIDIA GeForce GTX 770M SLI (Kepler)'},'status':'passed','name':'Provident'},
            {'_id':127875,'previousRunId':901700,'date':'2015-04-26T19:52:51.471Z','build':264,'author':{'first':'Allison','last':'Rempel'},'envShort':'OS X 10.11/Chrome 49','envFull':{'OS':'OS X 10.11 EI Capitan','Browser':'Chrome 49.0','CPU':'Intel Core i5-6300U (Skylake)','GPU':'Qualcomm Adreno 420'},'status':'failed','name':'Quo illo'},
            {'_id':635713,'previousRunId':679431,'date':'2015-04-25T23:53:55.722Z','build':144,'author':{'first':'Buster','last':'Connelly'},'envShort':'Win 10/Chrome 49','envFull':{'OS':'Windows 10','Browser':'Chrome 49.0','CPU':'Intel Core i7-2820QM (Sandy Bridge)'},'status':'failed','name':'Omnis non'},
            {'_id':705900,'previousRunId':428468,'date':'2015-06-09T17:51:14.501Z','build':288,'author':{'first':'Maribel','last':'Powlowski'},'envShort':'Win XP/Safari 7.0','envFull':{'OS':'Windows XP','Browser':'Safari 7.0.6'},'status':'failed','name':'Magnam distinctio'},
            {'_id':540218,'previousRunId':155571,'date':'2015-12-29T05:38:56.491Z','build':677,'author':{'first':'Alva','last':'Harris'},'envShort':'Win XP/Firefox 43','envFull':{'OS':'Windows XP','Browser':'Firefox 43.0.1','CPU':'Intel Pentium 4405U (Skylake)','Memory':'6GB'},'status':'passed','name':'Tempora quod'},
            {'_id':632360,'previousRunId':481013,'date':'2015-11-09T00:25:57.160Z','build':753,'author':{'first':'Lorenza','last':'Marks'},'envShort':'OS X 10.9/Firefox 41','envFull':{'OS':'OS X 10.9 Mavericks','Browser':'Firefox 41.0.2','CPU':'Intel Core i5-6300U (Skylake)','Memory':'14GB'},'status':'failed','name':'Praesentium'},
            {'_id':984071,'previousRunId':928268,'date':'2015-05-21T03:57:20.843Z','build':110,'author':{'first':'Winston','last':'Ratke'},'envShort':'OS X 10.10/Chrome 47','envFull':{'OS':'OS X 10.10  Yosemite','Browser':'Chrome 47.0.2526','CPU':'Intel Core i5-6300U (Skylake)'},'status':'failed','name':'Facere porro'},
            {'_id':40029,'previousRunId':298881,'date':'2015-07-24T23:17:45.226Z','build':414,'author':{'first':'Makenna','last':'Herman'},'envShort':'Win 7/Firefox 41','envFull':{'OS':'Windows 7','Browser':'Firefox 41.0.2','GPU':'NVIDIA GeForce GTX 770M SLI (Kepler)'},'status':'failed','name':'Tempora'},
            {'_id':595154,'previousRunId':213052,'date':'2015-05-06T22:49:52.659Z','build':132,'author':{'first':'Felipe','last':'Ondricka'},'envShort':'Andr 4.4.4/Chrome 48','envFull':{'OS':'Android 4.4.4 KitKat','Browser':'Chrome 48.0.2564','CPU':'AMD Pro A12-8800B (Carrizo)','Memory':'2GB'},'status':'passed','name':'Officia ut'},
            {'_id':102665,'previousRunId':463794,'date':'2015-06-18T04:15:02.109Z','build':999,'author':{'first':'Kareem','last':'D\'Amore'},'envShort':'OS X 10.9/Firefox 42','envFull':{'OS':'OS X 10.9 Mavericks','Browser':'Firefox 42.0','CPU':'Intel Pentium 4405U (Skylake)','GPU':'ARM Mali-400 MP4','Memory':'2GB'},'status':'failed','name':'Molestias'},
            {'_id':622088,'previousRunId':423097,'date':'2015-06-06T01:55:57.920Z','build':198,'author':{'first':'Jacinto','last':'Gislason'},'envShort':'Andr 4.4.4/Safari 9.0','envFull':{'OS':'Android 4.4.4 KitKat','Browser':'Safari 9.0.2','CPU':'Intel Pentium 4405U (Skylake)'},'status':'failed','name':'Ad'},
            {'_id':198473,'previousRunId':643823,'date':'2015-02-11T02:49:33.036Z','build':810,'author':{'first':'Damon','last':'Zboncak'},'envShort':'Win XP/Safari 7.1','envFull':{'OS':'Windows XP','Browser':'Safari 7.1.8','Memory':'14GB'},'status':'failed','name':'Excepturi et'},
            {'_id':147390,'previousRunId':885305,'date':'2015-03-10T19:08:39.943Z','build':680,'author':{'first':'Otis','last':'Yost'},'envShort':'Andr 5.1/Firefox 40','envFull':{'OS':'Android 5.1 Lollipop','Browser':'Firefox 40.0.3'},'status':'failed','name':'Magnam'},
            {'_id':564953,'previousRunId':972352,'date':'2015-12-22T17:13:27.219Z','build':448,'author':{'first':'Fermin','last':'Stokes'},'envShort':'OS X 10.11/Safari 7.0','envFull':{'OS':'OS X 10.11 EI Capitan','Browser':'Safari 7.0.6'},'status':'passed','name':'Rem blanditiis'},
            {'_id':512712,'previousRunId':113694,'date':'2015-07-20T21:05:48.509Z','build':254,'author':{'first':'Cleora','last':'Bosco'},'envShort':'Andr 4.2.2/Firefox 43','envFull':{'OS':'Android 4.2.2 Jelly Bean','Browser':'Firefox 43.0.1','CPU':'Intel Core i7-2820QM (Sandy Bridge)'},'status':'failed','name':'Voluptatibus'}
        ];
        // Code here will be ignored by JSHint.
        /* jshint ignore:end */
    }

    function getFilterDirectiveTmpl() {
        return '<smart-filter type="runs" fast-queries="[\'status=failed\', \'status=passed\', \'date> month ago\', \'date> year ago\']">'; // jshint ignore:line
    }

    function getSidebarDirectiveTmpl() {
        return '<ht-sidebar sidebar="vmShell.sidebar">';
    }

    function getMockSuites() {
        return [
            {
                "_id": "569fd358be47dd8b09b4f469",
                "suiteName": "Test Suite Z",
                "project": "569660e391b0bc1a28003311",
                "stests": [],
                "__v": 0,
                "suiteDescription": "No description."
            },
            {
                "_id": "56a0c46042a230635622f6f8",
                "suiteName": "Test Suite X",
                "project": "569660e391b0bc1a28003311",
                "stests": [],
                "__v": 0
            },
            {
                "_id": "56a623b5c2b74a5831279f1e",
                "suiteName": "Test Suite One",
                "project": "569660e391b0bc1a28003311",
                "stests": [],
                "suiteDescription": "Test Suite Description",
                "__v": 0
            }
        ];
    }

    function getMockTests() {
        return [
            {
                "_id": "56a132ddfbc730c20b9c06aa",
                "testName": "Test Case The First",
                "preConditions": "NodeJS Installed",
                "suite": "569fd358be47dd8b09b4f469",
                "steps": [
                    {
                        "stepDescription": "Open the app in the browser",
                        "expectedResult": "Browser is opened",
                        "_id": "56a133d2fbc730c20b9c06b3"
                    },
                    {
                        "stepDescription": "Log in",
                        "expectedResult": "You are logged in",
                        "_id": "56a133d2fbc730c20b9c06b2"
                    },
                    {
                        "stepDescription": "Awesome!",
                        "expectedResult": "You are awesome!",
                        "_id": "56a133d2fbc730c20b9c06b1"
                    }
                ],
                "priority": "High",
                "created": "2016-01-21T19:34:53.001Z",
                "testDescription": "No description.",
                "__v": 0
            },
            {
                "_id": "56a21076b27afde41ae1cb05",
                "testName": "Test Case Alpha",
                "preConditions": "Server started.",
                "suite": "56a0c46042a230635622f6f8",
                "steps": [
                    {
                        "stepDescription": "Open the browser",
                        "expectedResult": "Browser is opened",
                        "_id": "56a21076b27afde41ae1cb08"
                    },
                    {
                        "stepDescription": "Enter the app URL",
                        "expectedResult": "See the app",
                        "_id": "56a21076b27afde41ae1cb07"
                    },
                    {
                        "stepDescription": "Awesome!",
                        "expectedResult": "You are awesome!",
                        "_id": "56a21076b27afde41ae1cb06"
                    }
                ],
                "priority": "Low",
                "created": "2016-01-22T11:20:22.236Z",
                "testDescription": "No description.",
                "__v": 0
            }
        ];
    }

    function getMockTestsOfSuite(suiteID) {
        var tests = getMockTests(),
            i, l = tests.length,
            testsOfSuite = [];
        for (i = 0; i < l; i++) {
            if (tests[i].suite === suiteID)
                testsOfSuite.push(tests[i]);
        }
        return testsOfSuite;
    }

    function getMockSteps() {
        return [];
    }

})();
