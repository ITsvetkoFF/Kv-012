var faker = require('faker');

/**
 * Generate specified number of fake run objects
 * ```
 * {
          *    "previousRunId": "int",
          *    "date": "date",
          *    "build": "string",
          *    "envSort": "string",
          *    "envFull": "string",
          *    "status": "string: ['passed', 'failed', 'not run']",
          *    "tests": [{
          *        "status": "string: ['passed', 'failed', 'not run']",
          *        "name": 'string',
          *        "suite": 'string',
          *        "steps": [{
          *            "number": "int",
          *            "action": "string",
          *            "expected": "string",
          *            "status": "string: [passed, failed]"
          *        }]
          *    }]
          *}
 * ```
 * @memberOf fakeRunsFactory
 * @param {number} runsMaxCount default = 1; positive maximal number of runs
 * @param {number} testsMaxCount default = 1; positive maximal number of tests in run
 * @param {number} stepsMaxCount default = 1; positive maximal number of steps in test
 * @returns {Array.<{Object}>} array of run objects
 *
 */
function getFakeRuns(quantity, users, projects) {
    quantity = quantity || 1;
    quantity = (quantity < 1) ? 1 : quantity;

    var runs = [];

    var OSShort = ['Win XP', 'Win 7', 'Win 8', 'Win 10', 'OS X 10.11', 'OS X 10.10',
        'OS X 10.9', 'Andr 6.0', 'Andr 5.1', 'Andr 4.4.4', 'Andr 4.3.1', 'Andr 4.2.2'];
    var OSFull = ['Windows XP', 'Windows 7', 'Windows 8', 'Windows 10', 'OS X 10.11 EI Capitan',
        'OS X 10.10  Yosemite', 'OS X 10.9 Mavericks', 'Android 6.0 Marshmallow', 'Android 5.1 Lollipop',
        'Android 4.4.4 KitKat', 'Android 4.3.1 Jelly Bean', 'Android 4.2.2 Jelly Bean'];
    var browsersShort = ['Chrome 49', 'Chrome 48', 'Chrome 47', 'Chrome 46', 'Firefox 43', 'Firefox 42',
        'Firefox 41', 'Firefox 40', 'Safari 9.0', 'Safari 8.0', 'Safari 7.1', 'Safari 7.0'];
    var browsersFull = ['Chrome 49.0', 'Chrome 48.0.2564', 'Chrome 47.0.2526', 'Chrome 46.0.2490',
        'Firefox 43.0.1', 'Firefox 42.0', 'Firefox 41.0.2', 'Firefox 40.0.3', 'Safari 9.0.2', 'Safari 8.0.8',
        'Safari 7.1.8', 'Safari 7.0.6'];
    var cpuFull = ['Intel Core i7-4810MQ (Haswell)', 'Intel Core i7-3840QM (Ivy Bridge)',
        'Intel Core i7-2820QM (Sandy Bridge)', 'Intel Core i5-6300U (Skylake)', 'AMD Pro A12-8800B (Carrizo)',
        'Intel Pentium 4405U (Skylake)', 'AMD A10-7300 (Kaveri)'];
    var cpuShort = ['i7-4810MQ', 'i7-3840QM', 'i7-2820QM', 'i5-6300U', 'AMD A12-8800B', 'Pentium 4405U',
        'AMD A10-7300'];
    var gpuFull = ['NVIDIA GeForce GTX 770M SLI (Kepler)', 'AMD Radeon HD 7970M (GCN)',
        'NVIDIA GeForce GTX 470M SLI (Fermi)', 'AMD Radeon HD 8850M (GCN)', 'ARM Mali-400 MP4',
        'Qualcomm Adreno 320', 'Qualcomm Adreno 420', 'ARM Mali-T760 MP8 (Midgard 3rd-gen)'];
    var gpuShort = ['GTX 770M', 'HD 7970M', 'GTX 470M', 'HD 8850M', 'Mali-400', 'Adreno 320', 'Adreno 420',
        'Mali-T760'];

    for (var i = 0; i < quantity; i++) {
        var env = {
            'OS': faker.random.number(OSShort.length - 1),
            'Browser': faker.random.number(browsersShort.length - 1)
        };
        var status = 'passed';
        if (faker.random.number(100) > 75) {
            status = 'failed';
        }

        runs[i] = {
            name: faker.lorem.sentence(1, 1).slice(0, -1),
            author: users[faker.random.number(users.length - 1)]._id,
            dateStart: faker.date.past(),
            dateEnd: faker.date.future(),
            build: faker.random.number(1000),
            envShort: OSShort[env['OS']] + '/' + browsersShort[env['Browser']],
            envFull: {
                'OS': OSFull[env['OS']],
                'Browser': browsersFull[env['Browser']]
            },
            project: projects[faker.random.number(projects.length - 1)]._id,
            status: status
        };

        if (faker.random.boolean()) {
            runs[i].envFull['CPU'] = cpuFull[faker.random.number(cpuFull.length - 1)];
        }
        if (faker.random.boolean()) {
            runs[i].envFull['GPU'] = gpuFull[faker.random.number(gpuFull.length - 1)];
        }
        if (faker.random.boolean()) {
            runs[i].envFull['Memory'] = faker.random.number({min: 1, max: 16}) + 'GB';
        }
    }

    return runs;
}

module.exports = getFakeRuns;
