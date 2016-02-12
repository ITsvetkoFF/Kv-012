var mockData = (function () {
    return {
        getMockStates: getMockStates,
        getMockRuns: getMockRuns,
        getFilterDirectiveTmpl: getFilterDirectiveTmpl,
        getMockSuites: getMockSuites,
        getMockTests: getMockTests,
        getMockTestsOfSuite: getMockTestsOfSuite,
        getMockSteps: getMockSteps,
        getSidebarDirectiveTmpl: getSidebarDirectiveTmpl,
        getMe: getMe,
        getProjects: getProjects,
        getMockRun: getMockRun,
        getMockClusters: getMockClusters,
        getMockProgress: getMockProgress,
        getMockUser: getMockUser
    };

    function getMockUser() {
        return {
            '_id': '56b1fdb41c4539e812bd4d77',
            'firstName': 'Isai',
            'lastName': 'Mayer',
            'email': 'Rolando_Bahringer29@gmail.com',
            currentProjectID: '56b1fdb41c4539e812bd4d7c'
        };
    }

    function getMockRun() {
        return [
            {
                '_id': '56b1fdb41c4539e812bd4d90',
                'name': 'Omnis aperiam',
                'author': {
                    '_id': '56b1fdb41c4539e812bd4d77',
                    'firstName': 'Isai',
                    'lastName': 'Mayer',
                    'email': 'Rolando_Bahringer29@gmail.com',
                    'avatar': 'https://s3.amazonaws.com/uifaces/faces/twitter/anasnakawa/128.jpg',
                    'password': '$2a$10$2hqlN.wtldOcDfZZhX58DuBjB7upQlFXQ8kiWiq7tgphPt/HIEn92',
                    'projects': []
                },
                'dateStart': '2016-01-05T14:08:24.988Z',
                'dateEnd': '2016-05-18T23:13:00.344Z',
                'build': 836,
                'envShort': 'Win 7/Chrome 48',
                'envFull': {
                    'OS': 'Windows 7',
                    'Browser': 'Chrome 48.0.2564',
                    'CPU': 'Intel Core i7-2820QM (Sandy Bridge)'
                },
                'project': '56b1fdb41c4539e812bd4d7c',
                'status': 'passed'
            }
        ];
    }

    function getMockProgress() {
        return {
            passed: 1,
            failed: 1,
            pending: 0,
            length: 2
        };
    }

    function getMockClusters() {
        return [
            [

                {
                    '_id': '56b1fdb51c4539e812bd4dc5',
                    'testName': 'Consequuntur voluptatem ea',
                    'testDescription': 'Non velit aut error.',
                    'automated': true,
                    'preConditions': 'Distinctio aliquid pariatur.',
                    'suite': 'Beatae iusto',
                    'created': '2015-02-26T09:38:25.346Z',
                    'run': '56b1fdb41c4539e812bd4d90',
                    'steps': [
                        {
                            'description': 'Et quo sit dolores facere odit reprehenderit minima suscipit.',
                            'expectedResult': 'Et quo cumque voluptatem impedit distinctio cum quam nihil ut.',
                            'status': 'passed'
                        }
                    ],
                    'status': 'passed'
                }],
            [{
                '_id': '56b1fdb51c4539e812bd4ebb',
                'testName': 'Quos expedita porro illum non explicabo sit velit accusamus consequatur',
                'testDescription': 'Ratione sit voluptas voluptas et rerum quaerat cumque blanditiis.',
                'automated': true,
                'preConditions': 'Est ab doloribus aliquam non atque sed.',
                'suite': 'Est rerum',
                'created': '2015-11-17T01:39:17.934Z',
                'run': '56b1fdb41c4539e812bd4d90',
                'steps': [
                    {
                        'description': 'Dignissimos culpa deserunt reiciendis nobis dolores.',
                        'expectedResult': 'Distinctio ut eius dolor.',
                        'status': 'passed'
                    }
                ],
                'status': 'failed'
            }
            ]
        ];
    }

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
            {'_id':963499,'previousRunId':744753,'date':'2015-09-18T19:06:17.623Z','build':456,'author':{'firstName':'Camryn','lastName':'Schaefer'},'envShort':'Andr 4.3.1/Safari 8.0','envFull':{'OS':'Android 4.3.1 Jelly Bean','Browser':'Safari 8.0.8','CPU':'Intel Pentium 4405U (Skylake)','GPU':'AMD Radeon HD 7970M (GCN)'},'status':'passed','name':'Quaerat itaque'},
            {'_id':472936,'previousRunId':463358,'date':'2015-12-01T04:00:31.144Z','build':36,'author':{'firstName':'Frederik','lastName':'Pfeffer'},'envShort':'Win 10/Firefox 43','envFull':{'OS':'Windows 10','Browser':'Firefox 43.0.1','GPU':'Qualcomm Adreno 420'},'status':'failed','name':'Aliquam'},
            {'_id':6799,'previousRunId':86735,'date':'2015-02-23T23:34:45.733Z','build':939,'author':{'firstName':'Hermann','lastName':'Dach'},'envShort':'Win 8/Firefox 42','envFull':{'OS':'Windows 8','Browser':'Firefox 42.0','GPU':'Qualcomm Adreno 420'},'status':'failed','name':'Labore expedita'},
            {'_id':541022,'previousRunId':207149,'date':'2015-05-20T06:15:54.553Z','build':561,'author':{'firstName':'Alysa','lastName':'Braun'},'envShort':'Andr 5.1/Firefox 41','envFull':{'OS':'Android 5.1 Lollipop','Browser':'Firefox 41.0.2','CPU':'AMD A10-7300 (Kaveri)'},'status':'failed','name':'Accusamus'},
            {'_id':811533,'previousRunId':22690,'date':'2015-01-18T20:07:02.518Z','build':38,'author':{'firstName':'Kavon','lastName':'Gutkowski'},'envShort':'Win 8/Chrome 49','envFull':{'OS':'Windows 8','Browser':'Chrome 49.0','CPU':'Intel Core i7-4810MQ (Haswell)','GPU':'Qualcomm Adreno 320','Memory':'10GB'},'status':'failed','name':'Velit repellendus'},
            {'_id':889572,'previousRunId':169431,'date':'2015-08-17T14:37:35.811Z','build':258,'author':{'firstName':'Sabryna','lastName':'Fahey'},'envShort':'Win 8/Chrome 48','envFull':{'OS':'Windows 8','Browser':'Chrome 48.0.2564','CPU':'AMD Pro A12-8800B (Carrizo)','Memory':'8GB'},'status':'failed','name':'Vero'},
            {'_id':366177,'previousRunId':559158,'date':'2015-05-19T00:48:49.432Z','build':885,'author':{'firstName':'Yadira','lastName':'Funk'},'envShort':'Andr 6.0/Safari 9.0','envFull':{'OS':'Android 6.0 Marshmallow','Browser':'Safari 9.0.2','CPU':'AMD A10-7300 (Kaveri)','GPU':'NVIDIA GeForce GTX 470M SLI (Fermi)','Memory':'7GB'},'status':'failed','name':'Id'},
            {'_id':8696,'previousRunId':246432,'date':'2015-02-05T01:27:57.843Z','build':475,'author':{'firstName':'Daphney','lastName':'Murazik'},'envShort':'Win 8/Chrome 48','envFull':{'OS':'Windows 8','Browser':'Chrome 48.0.2564','GPU':'NVIDIA GeForce GTX 770M SLI (Kepler)','Memory':'15GB'},'status':'failed','name':'Dicta qui'},
            {'_id':609094,'previousRunId':661943,'date':'2015-04-14T11:50:52.379Z','build':6,'author':{'firstName':'Julie','lastName':'Kshlerin'},'envShort':'Andr 5.1/Safari 7.0','envFull':{'OS':'Android 5.1 Lollipop','Browser':'Safari 7.0.6','GPU':'ARM Mali-T760 MP8 (Midgard 3rd-gen)'},'status':'passed','name':'Tempore sit'},
            {'_id':710910,'previousRunId':119473,'date':'2015-09-02T01:03:06.111Z','build':671,'author':{'firstName':'Arch','lastName':'Gottlieb'},'envShort':'OS X 10.11/Chrome 46','envFull':{'OS':'OS X 10.11 EI Capitan','Browser':'Chrome 46.0.2490','Memory':'9GB'},'status':'passed','name':'Est'},
            {'_id':31077,'previousRunId':890297,'date':'2015-07-16T05:50:40.953Z','build':179,'author':{'firstName':'Brittany','lastName':'Dibbert'},'envShort':'Win 10/Chrome 47','envFull':{'OS':'Windows 10','Browser':'Chrome 47.0.2526','CPU':'Intel Pentium 4405U (Skylake)','GPU':'AMD Radeon HD 7970M (GCN)'},'status':'failed','name':'Recusandae aut'},
            {'_id':200454,'previousRunId':550618,'date':'2015-09-12T11:14:47.579Z','build':962,'author':{'firstName':'Marvin','lastName':'Turner'},'envShort':'Andr 6.0/Firefox 41','envFull':{'OS':'Android 6.0 Marshmallow','Browser':'Firefox 41.0.2','CPU':'Intel Core i7-2820QM (Sandy Bridge)','GPU':'ARM Mali-400 MP4'},'status':'failed','name':'Et enim'},
            {'_id':13674,'previousRunId':132510,'date':'2015-11-16T16:14:12.205Z','build':112,'author':{'firstName':'Bulah','lastName':'Hills'},'envShort':'Win 10/Chrome 48','envFull':{'OS':'Windows 10','Browser':'Chrome 48.0.2564','CPU':'AMD A10-7300 (Kaveri)','Memory':'9GB'},'status':'failed','name':'Quas aliquid'},
            {'_id':283917,'previousRunId':111080,'date':'2015-12-01T01:39:26.722Z','build':61,'author':{'firstName':'Alverta','lastName':'Schmitt'},'envShort':'OS X 10.11/Chrome 46','envFull':{'OS':'OS X 10.11 EI Capitan','Browser':'Chrome 46.0.2490','CPU':'Intel Core i7-4810MQ (Haswell)','GPU':'Qualcomm Adreno 320'},'status':'failed','name':'Aperiam voluptas'},
            {'_id':688460,'previousRunId':420383,'date':'2015-04-27T01:48:03.486Z','build':717,'author':{'firstName':'Hubert','lastName':'Williamson'},'envShort':'Andr 4.2.2/Chrome 47','envFull':{'OS':'Android 4.2.2 Jelly Bean','Browser':'Chrome 47.0.2526','CPU':'Intel Core i5-6300U (Skylake)'},'status':'passed','name':'Dolorem'},
            {'_id':311283,'previousRunId':571038,'date':'2015-02-01T22:59:14.649Z','build':446,'author':{'firstName':'Anya','lastName':'Gleason'},'envShort':'Win 8/Firefox 41','envFull':{'OS':'Windows 8','Browser':'Firefox 41.0.2','GPU':'NVIDIA GeForce GTX 770M SLI (Kepler)'},'status':'failed','name':'Consequatur quaerat'},
            {'_id':770676,'previousRunId':821282,'date':'2015-02-18T02:39:27.261Z','build':712,'author':{'firstName':'Shayna','lastName':'Tremblay'},'envShort':'Win 7/Chrome 46','envFull':{'OS':'Windows 7','Browser':'Chrome 46.0.2490'},'status':'failed','name':'Eum'},
            {'_id':914737,'previousRunId':216373,'date':'2015-05-11T10:13:36.984Z','build':503,'author':{'firstName':'Cara','lastName':'Heidenreich'},'envShort':'Andr 6.0/Safari 7.1','envFull':{'OS':'Android 6.0 Marshmallow','Browser':'Safari 7.1.8','Memory':'4GB'},'status':'failed','name':'Maiores'},
            {'_id':995644,'previousRunId':898547,'date':'2015-02-20T07:39:48.388Z','build':6,'author':{'firstName':'Tillman','lastName':'O\'Conner'},'envShort':'Win XP/Chrome 49','envFull':{'OS':'Windows XP','Browser':'Chrome 49.0','CPU':'Intel Core i7-2820QM (Sandy Bridge)','GPU':'Qualcomm Adreno 420','Memory':'6GB'},'status':'passed','name':'Perferendis'},
            {'_id':493960,'previousRunId':588931,'date':'2015-05-23T01:05:10.591Z','build':896,'author':{'firstName':'Glenna','lastName':'Ratke'},'envShort':'OS X 10.10/Firefox 41','envFull':{'OS':'OS X 10.10  Yosemite','Browser':'Firefox 41.0.2','CPU':'AMD A10-7300 (Kaveri)','GPU':'Qualcomm Adreno 420','Memory':'14GB'},'status':'failed','name':'Autem'},
            {'_id':342516,'previousRunId':440943,'date':'2015-04-10T22:46:42.225Z','build':489,'author':{'firstName':'Fae','lastName':'Blick'},'envShort':'Win 7/Chrome 46','envFull':{'OS':'Windows 7','Browser':'Chrome 46.0.2490','CPU':'AMD A10-7300 (Kaveri)','GPU':'Qualcomm Adreno 420','Memory':'8GB'},'status':'passed','name':'Id quas'},
            {'_id':915497,'previousRunId':65101,'date':'2015-05-11T20:25:02.807Z','build':107,'author':{'firstName':'Jalyn','lastName':'Russel'},'envShort':'Andr 4.4.4/Firefox 40','envFull':{'OS':'Android 4.4.4 KitKat','Browser':'Firefox 40.0.3','CPU':'Intel Pentium 4405U (Skylake)','Memory':'10GB'},'status':'failed','name':'Veniam'},
            {'_id':211289,'previousRunId':193617,'date':'2015-11-12T14:59:30.187Z','build':908,'author':{'firstName':'Chadd','lastName':'Feeney'},'envShort':'Win 8/Chrome 48','envFull':{'OS':'Windows 8','Browser':'Chrome 48.0.2564','CPU':'Intel Core i5-6300U (Skylake)'},'status':'failed','name':'Distinctio et'},
            {'_id':375927,'previousRunId':261828,'date':'2015-04-30T20:31:23.368Z','build':524,'author':{'firstName':'Grover','lastName':'Beahan'},'envShort':'Andr 4.4.4/Safari 7.1','envFull':{'OS':'Android 4.4.4 KitKat','Browser':'Safari 7.1.8','CPU':'Intel Core i7-2820QM (Sandy Bridge)','Memory':'3GB'},'status':'failed','name':'Vero fugiat'},
            {'_id':788863,'previousRunId':924171,'date':'2015-10-23T18:00:38.507Z','build':162,'author':{'firstName':'Cielo','lastName':'Lueilwitz'},'envShort':'OS X 10.11/Chrome 46','envFull':{'OS':'OS X 10.11 EI Capitan','Browser':'Chrome 46.0.2490','GPU':'NVIDIA GeForce GTX 770M SLI (Kepler)'},'status':'passed','name':'Provident'},
            {'_id':127875,'previousRunId':901700,'date':'2015-04-26T19:52:51.471Z','build':264,'author':{'firstName':'Allison','lastName':'Rempel'},'envShort':'OS X 10.11/Chrome 49','envFull':{'OS':'OS X 10.11 EI Capitan','Browser':'Chrome 49.0','CPU':'Intel Core i5-6300U (Skylake)','GPU':'Qualcomm Adreno 420'},'status':'failed','name':'Quo illo'},
            {'_id':635713,'previousRunId':679431,'date':'2015-04-25T23:53:55.722Z','build':144,'author':{'firstName':'Buster','lastName':'Connelly'},'envShort':'Win 10/Chrome 49','envFull':{'OS':'Windows 10','Browser':'Chrome 49.0','CPU':'Intel Core i7-2820QM (Sandy Bridge)'},'status':'failed','name':'Omnis non'},
            {'_id':705900,'previousRunId':428468,'date':'2015-06-09T17:51:14.501Z','build':288,'author':{'firstName':'Maribel','lastName':'Powlowski'},'envShort':'Win XP/Safari 7.0','envFull':{'OS':'Windows XP','Browser':'Safari 7.0.6'},'status':'failed','name':'Magnam distinctio'},
            {'_id':540218,'previousRunId':155571,'date':'2015-12-29T05:38:56.491Z','build':677,'author':{'firstName':'Alva','lastName':'Harris'},'envShort':'Win XP/Firefox 43','envFull':{'OS':'Windows XP','Browser':'Firefox 43.0.1','CPU':'Intel Pentium 4405U (Skylake)','Memory':'6GB'},'status':'passed','name':'Tempora quod'},
            {'_id':632360,'previousRunId':481013,'date':'2015-11-09T00:25:57.160Z','build':753,'author':{'firstName':'Lorenza','lastName':'Marks'},'envShort':'OS X 10.9/Firefox 41','envFull':{'OS':'OS X 10.9 Mavericks','Browser':'Firefox 41.0.2','CPU':'Intel Core i5-6300U (Skylake)','Memory':'14GB'},'status':'failed','name':'Praesentium'},
            {'_id':984071,'previousRunId':928268,'date':'2015-05-21T03:57:20.843Z','build':110,'author':{'firstName':'Winston','lastName':'Ratke'},'envShort':'OS X 10.10/Chrome 47','envFull':{'OS':'OS X 10.10  Yosemite','Browser':'Chrome 47.0.2526','CPU':'Intel Core i5-6300U (Skylake)'},'status':'failed','name':'Facere porro'},
            {'_id':40029,'previousRunId':298881,'date':'2015-07-24T23:17:45.226Z','build':414,'author':{'firstName':'Makenna','lastName':'Herman'},'envShort':'Win 7/Firefox 41','envFull':{'OS':'Windows 7','Browser':'Firefox 41.0.2','GPU':'NVIDIA GeForce GTX 770M SLI (Kepler)'},'status':'failed','name':'Tempora'},
            {'_id':595154,'previousRunId':213052,'date':'2015-05-06T22:49:52.659Z','build':132,'author':{'firstName':'Felipe','lastName':'Ondricka'},'envShort':'Andr 4.4.4/Chrome 48','envFull':{'OS':'Android 4.4.4 KitKat','Browser':'Chrome 48.0.2564','CPU':'AMD Pro A12-8800B (Carrizo)','Memory':'2GB'},'status':'passed','name':'Officia ut'},
            {'_id':102665,'previousRunId':463794,'date':'2015-06-18T04:15:02.109Z','build':999,'author':{'firstName':'Kareem','lastName':'D\'Amore'},'envShort':'OS X 10.9/Firefox 42','envFull':{'OS':'OS X 10.9 Mavericks','Browser':'Firefox 42.0','CPU':'Intel Pentium 4405U (Skylake)','GPU':'ARM Mali-400 MP4','Memory':'2GB'},'status':'failed','name':'Molestias'},
            {'_id':622088,'previousRunId':423097,'date':'2015-06-06T01:55:57.920Z','build':198,'author':{'firstName':'Jacinto','lastName':'Gislason'},'envShort':'Andr 4.4.4/Safari 9.0','envFull':{'OS':'Android 4.4.4 KitKat','Browser':'Safari 9.0.2','CPU':'Intel Pentium 4405U (Skylake)'},'status':'failed','name':'Ad'},
            {'_id':198473,'previousRunId':643823,'date':'2015-02-11T02:49:33.036Z','build':810,'author':{'firstName':'Damon','lastName':'Zboncak'},'envShort':'Win XP/Safari 7.1','envFull':{'OS':'Windows XP','Browser':'Safari 7.1.8','Memory':'14GB'},'status':'failed','name':'Excepturi et'},
            {'_id':147390,'previousRunId':885305,'date':'2015-03-10T19:08:39.943Z','build':680,'author':{'firstName':'Otis','lastName':'Yost'},'envShort':'Andr 5.1/Firefox 40','envFull':{'OS':'Android 5.1 Lollipop','Browser':'Firefox 40.0.3'},'status':'failed','name':'Magnam'},
            {'_id':564953,'previousRunId':972352,'date':'2015-12-22T17:13:27.219Z','build':448,'author':{'firstName':'Fermin','lastName':'Stokes'},'envShort':'OS X 10.11/Safari 7.0','envFull':{'OS':'OS X 10.11 EI Capitan','Browser':'Safari 7.0.6'},'status':'passed','name':'Rem blanditiis'},
            {'_id':512712,'previousRunId':113694,'date':'2015-07-20T21:05:48.509Z','build':254,'author':{'firstName':'Cleora','lastName':'Bosco'},'envShort':'Andr 4.2.2/Firefox 43','envFull':{'OS':'Android 4.2.2 Jelly Bean','Browser':'Firefox 43.0.1','CPU':'Intel Core i7-2820QM (Sandy Bridge)'},'status':'failed','name':'Voluptatibus'}
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
                '_id': '569fd358be47dd8b09b4f469',
                'suiteName': 'Test Suite Z',
                'project': '569660e391b0bc1a28003311',
                'stests': [],
                '__v': 0,
                'suiteDescription': 'No description.'
            },
            {
                '_id': '56a0c46042a230635622f6f8',
                'suiteName': 'Test Suite X',
                'project': '569660e391b0bc1a28003311',
                'stests': [],
                '__v': 0
            },
            {
                '_id': '56a623b5c2b74a5831279f1e',
                'suiteName': 'Test Suite One',
                'project': '569660e391b0bc1a28003311',
                'stests': [],
                'suiteDescription': 'Test Suite Description',
                '__v': 0
            }
        ];
    }

    function getMockTests() {
        return [
            {
                '_id': '56b1fdb51c4539e812bd4dc5',
                'testName': 'Consequuntur voluptatem ea',
                'testDescription': 'Non velit aut error.',
                'automated': true,
                'preConditions': 'Distinctio aliquid pariatur.',
                'suite': 'Beatae iusto',
                'created': '2015-02-26T09:38:25.346Z',
                'run': '56b1fdb41c4539e812bd4d90',
                'steps': [
                    {
                        'description': 'Et quo sit dolores facere odit reprehenderit minima suscipit.',
                        'expectedResult': 'Et quo cumque voluptatem impedit distinctio cum quam nihil ut.',
                        'status': 'passed'
                    }
                ],
                'status': 'passed'
            },
            {
                '_id': '56b1fdb51c4539e812bd4ebb',
                'testName': 'Quos expedita porro illum non explicabo sit velit accusamus consequatur',
                'testDescription': 'Ratione sit voluptas voluptas et rerum quaerat cumque blanditiis.',
                'automated': true,
                'preConditions': 'Est ab doloribus aliquam non atque sed.',
                'suite': 'Est rerum',
                'created': '2015-11-17T01:39:17.934Z',
                'run': '56b1fdb41c4539e812bd4d90',
                'steps': [
                    {
                        'description': 'Dignissimos culpa deserunt reiciendis nobis dolores.',
                        'expectedResult': 'Distinctio ut eius dolor.',
                        'status': 'passed'
                    }
                ],
                'status': 'failed'
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

    function getMe() {
        return {
            '_id': '56b11cbff9a9839972d3c629',
            'trelloToken': 'ac6e48175e484ada2bdab31731eb5b863ee8f6156507440fd2aca92eef70c1bf',
            'trelloUserID': '567302e74768c9778f1549d1',
            'fullName': 'Yaroslav',
            '__v': 0,
            'currentProjectID': '56b11ca040e8e38011671d5b',
            'projects': []
        };
    }

    function getProjects() {
        return [
            {
                '_id': '56b11ca040e8e38011671d5b',
                'name': 'Orn and Sons',
                'description': 'Necessitatibus sit et.',
                'admins': [
                    '56b11ca040e8e38011671d56'
                ],
                'users': [
                    '56b11ca040e8e38011671d53',
                    '56b11ca040e8e38011671d59',
                    '56b11ca040e8e38011671d57',
                    '56b11ca040e8e38011671d58',
                    '56b11ca040e8e38011671d5a'
                ],
                'dateStart': '2015-11-05T21:45:01.970Z',
                'dateEnd': '2016-10-25T12:52:31.662Z'
            },
            {
                '_id': '56b11ca040e8e38011671d5c',
                'name': 'Toy, Stamm and Carroll',
                'description': 'Aliquam tempora et ut aut corrupti laborum.',
                'admins': [
                    '56b11ca040e8e38011671d55'
                ],
                'users': [
                    '56b11ca040e8e38011671d54',
                    '56b11ca040e8e38011671d5a',
                    '56b11ca040e8e38011671d58',
                    '56b11ca040e8e38011671d56'
                ],
                'dateStart': '2015-08-18T16:01:56.258Z',
                'dateEnd': '2016-12-26T19:20:46.967Z'
            },
            {
                '_id': '56b11ca040e8e38011671d5d',
                'name': 'Hammes, Dietrich and Walsh',
                'description': 'Pariatur occaecati non at aut.',
                'admins': [
                    '56b11ca040e8e38011671d55'
                ],
                'users': [
                    '56b11ca040e8e38011671d58',
                    '56b11ca040e8e38011671d57',
                    '56b11ca040e8e38011671d53'
                ],
                'dateStart': '2015-07-22T22:31:05.079Z',
                'dateEnd': '2016-04-07T16:32:24.225Z'
            }
        ];
    }

})();
