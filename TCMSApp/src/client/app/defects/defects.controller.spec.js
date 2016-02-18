/* jshint -W117, -W030 */
describe('Tests Defects', function() {
    var controller;
    beforeEach(function () {
            bard.appModule('app.defects');
            bard.inject('$controller', '$rootScope', '$httpBackend', '$state', 'apiUrl');
            var scope = $rootScope.$new();
            var state = {};
            state.$current = {};
            state.$current.name = 'defects';
            controller = $controller('DefectsController', {$scope: scope, $state: state});
            var httpBackend = $httpBackend;
            httpBackend.when('GET', /defects/gi).respond(
                [
                    {
                        '_id':'56b0827025c2c3cc1146fc05',
                        'name':'ErrorName14587',
                        'reporter':'56b2056154fafdfc1586096a',
                        'dateOfDefectCreation':'2016-02-02T10:17:34.410Z',
                        'priority':'Normal',
                        'description':'rfrfrfnhvnslhrrhzhvsc\nhvwhnghnecw45645cshgkvmm',
                        'stepsToReproduce':['gfhdjhnbjnjnyvnynhnjnkynk'],
                        'status':'open',
                        '__v':0
                    },
                    {
                        '_id':'56b31a6748586dc017406713',
                        'name':'ErrorРусскийъыУкраїнська',
                        'reporter':'56b319d848586dc017406712',
                        'dateOfDefectCreation':'2016-02-04T09:29:14.516Z',
                        'priority':'Low',
                        'description':'DEscriptionDEscriptionDEscriptionDEscriptionDEscriptionDEscriptionDEscriptionD' +
                        'EscriptionDEscriptionDEscriptionDEscriptionDEscriptionDEscriptionDEscriptionDEscriptionDEscr' +
                        'iptionDEscriptionDEscriptionDEscriptionDEscriptionDEscriptionDEscriptionDEscriptionDEscripti' +
                        'onDEscriptionDEscriptionDEscriptionDEscriptionDEscriptionDEscriptionDEscriptionDEscriptionDE' +
                        'scriptionDEscriptionDEscriptionDEscriptionDEscriptionDEscriptionDEscriptionDEscriptionDEscri' +
                        'ptionDEscriptionDEscriptionDEscriptionDEscriptionDEscriptionDEscriptionDEscriptionDEscription',
                        'stepsToReproduce':['STEPtoReproduce 14578STEPtoReproduce 14578STEPtoReproduce 14578STEPtoRep' +
                        'roduce 14578STEPtoReproduce 14578STEPtoReproduce 14578STEPtoReproduce 14578STEPtoReproduce 1' +
                        '4578STEPtoReproduce 14578STEPtoReproduce 14578STEPtoReproduce 14578STEPtoReproduce 14578STEP' +
                        'toReproduce 14578STEPtoReproduce 14578STEPtoReproduce 14578STEPtoReproduce 14578STEPtoReprod' +
                        'uce 14578STEPtoReproduce 1457847rvbjehvmejl'],
                        'status':'inProgress',
                        '__v':0
                    },
                    {
                        '_id':'56b31ef548586dc017406715',
                        'name':'ErrorNamefrfrcrfgagf',
                        'reporter':'56b319d848586dc017406712',
                        'dateOfDefectCreation':'2016-02-04T09:50:13.815Z',
                        'priority':'Critical',
                        'description':'Description14122444dghv4c2',
                        'stepsToReproduce':['cfhvdnhybnvnStepToReproduie'],
                        'status':'notFix',
                        '__v':0
                    }
                ]
            );

            httpBackend.when('GET', '/api/v1/User').respond();
            httpBackend.flush();
            $rootScope.$apply();
        });

    bard.verifyNoOutstandingHttpRequests();

    describe('Defects Controller', function () {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });
    });

    beforeEach(function() {
        controller.setCurrentDefect(controller.arrayDefects[2]);
    });
    describe('Current Defect', function () {
        it('should be right current defect', function () {
            expect(controller.currentDefect.name).to.equal('ErrorNamefrfrcrfgagf');
            expect(controller.currentDefect.reporter).to.equal('56b319d848586dc017406712');
            expect(controller.currentDefect.description).to.equal('Description14122444dghv4c2');
        });
    });
    describe('Test Change Status', function () {
        it('should be IN PROGRESS status in defect', function () {
            expect(controller.arrayDefects[1].status).to.equal('inProgress');
        });

        it('should be OPEN status in defect', function () {
            var httpBackend = $httpBackend;
            httpBackend.when('PUT', apiUrl.defects + '/56b31a6748586dc017406713').respond(200);
            controller.statusChange('56b31a6748586dc017406713', 'open');
            httpBackend.flush();
            expect(controller.arrayDefects[1].status).to.equal('open');
        });
    });
});

describe('Tests Defects Empty Database', function() {
    var controller;
    beforeEach(function () {
        bard.appModule('app.defects');
        bard.inject('$controller', '$rootScope', '$httpBackend', '$state', 'apiUrl');
    });

    beforeEach(function () {
        var scope = $rootScope.$new();
        var state = {};
        state.$current = {};
        state.$current.name = 'defects';
        controller = $controller('DefectsController', {$scope: scope, $state: state});
        var httpBackend = $httpBackend;
        httpBackend.when('GET', /defects/gi).respond([]);
        httpBackend.when('GET', '/api/v1/User').respond();
        httpBackend.flush();
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Defects Controller', function () {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });
    });

    describe('No defects', function () {
        it('should be no defects', function () {
            expect(controller.statusMessage).to.equal('There are no defects');
        });
    });
});
