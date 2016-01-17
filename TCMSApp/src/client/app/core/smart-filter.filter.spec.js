/* jshint -W117, -W030 */
describe('smart-filter filter', function() {
    var smartFilter;

    beforeEach(function() {
        bard.appModule('app.core');
        bard.inject('$filter', 'filterFields', 'dataWrapper');
        smartFilter = $filter('smartFilter');
    });

    describe('when filtering runs', function() {
        var runs, runsFields, originalLength;

        beforeEach(function() {
            runsFields = filterFields.runs.getFields();
            runs = dataWrapper.wrapRuns(mockData.getMockRuns());
            originalLength = runs.length;
        });

        it('should load the filter', function() {
            expect(smartFilter).to.be.defined;
        });

        it('should load the filter fields object with all required keys', function() {
            expect(runsFields).to.contain.keys(['name', 'date', 'env', 'envFull', 'author', 'build', 'status']);
        });

        it('should correctly work without arguments', function() {
            var result = smartFilter(runs);
            expect(result).to.have.length(originalLength);
        });

        it('should correctly work with only one argument', function() {
            var result = smartFilter(runs, 'env:Andr');
            expect(result).to.have.length(originalLength);
        });

        it('should work when array of runs is empty', function() {
            var result = smartFilter([], 'env:Andr', runsFields);
            expect(result).to.have.length(0);
        });

        it('should correctly work when filter is applied for not array', function() {
            var notArray = 'string';
            var result = smartFilter(notArray);
            expect(result).to.equal(notArray);
        });

        describe('the \':\' functionality', function() {
            it('should filter runs by String field', function() {
                var query = 'name:Tem';
                var result = smartFilter(runs, query, runsFields);
                expect(result).to.have.length(3);
            });

            it('should filter runs by Number field', function() {
                var query = 'build:671';
                var result = smartFilter(runs, query, runsFields);
                expect(result).to.have.length(1);
            });

            it('should filter runs by Date field in format DD.MM.YY', function() {
                var query = 'date:30.04';
                var result = smartFilter(runs, query, runsFields);
                expect(result).to.have.length(1);
            });

            it('should filter runs by Author field', function() {
                var query = 'author:Fermin';
                var result = smartFilter(runs, query, runsFields);
                expect(result).to.have.length(1);
            });
        });

        describe('the \'>\' functionality', function() {
            it('should work correctly when applied for NaN fields', function() {
                var query = 'env>Win';
                var result = smartFilter(runs, query, runsFields);
                expect(result).to.have.length(originalLength);
            });

            it('should filter runs when applied for Number fields', function() {
                var query = 'build>28';
                var result = smartFilter(runs, query, runsFields);
                expect(result).to.have.length(37);
            });
        });

        describe('the \'<\' functionality', function() {
            it('should work correctly when applied for NaN fields', function() {
                var query = 'env<Win';
                var result = smartFilter(runs, query, runsFields);
                expect(result).to.have.length(originalLength);
            });

            it('should filter runs when applied for Number fields', function() {
                var query = 'build<39';
                var result = smartFilter(runs, query, runsFields);
                expect(result).to.have.length(4);
            });
        });

        describe('the \'=\' functionality', function() {
            it('should filter runs by String fields', function() {
                var query = 'status=failed';
                var result = smartFilter(runs, query, runsFields);
                expect(result).to.have.length(29);
            });

            // TODO: skipped due to unknown CI problems
            xit('should filter runs by Date fields in format DD.MM.YY', function() {
                var query = 'date=21.07.15';
                var result = smartFilter(runs, query, runsFields);
                expect(result).to.have.length(1);
            });

            it('should filter runs by Author field', function() {
                var query = 'author=Makenna Herman';
                var result = smartFilter(runs, query, runsFields);
                expect(result).to.have.length(1);
            });
        });

        describe('several fields filtering', function() {
            it('should filter runs by two fields', function() {
                var query = 'status:passed date>30.05.15';
                var result = smartFilter(runs, query, runsFields);
                expect(result).to.have.length(5);
            });

            it('should filter runs by three fields', function() {
                var query = 'build<704 status=failed env:Win';
                var result = smartFilter(runs, query, runsFields);
                expect(result).to.have.length(10);
            });
        });

        describe('query format', function() {
            var clock;

            before(function() {
                //needed for testing queries such as 'date> last month'
                clock = sinon.useFakeTimers(+new Date(2016,0,20));
            });

            after(function() {
                clock.restore();
            });

            it('shpuld work when value consists space', function() {
                var query = 'env:OS X';
                var result = smartFilter(runs, query, runsFields);
                expect(result).to.have.length(9);
            });

            it('should trim space after \':\'', function() {
                var query = 'build: 288';
                var result = smartFilter(runs, query, runsFields);
                expect(result).to.have.length(1);
            });

            it('should work correctly when key is not exists ', function() {
                var query = 'is:passed';
                var result = smartFilter(runs, query, runsFields);
                expect(result).to.have.length(originalLength);
            });

            it('should work correctly when query is invalid', function() {
                var query = 'name:env:Win';
                var result = smartFilter(runs, query, runsFields);
                expect(result).to.have.length(originalLength);
            });

            it('should filter runs when date is set as \'year ago\'', function() {
                var query = 'date> year ago';
                var result = smartFilter(runs, query, runsFields);
                expect(result).to.have.length(38);
            });

            it('should filter runs when date is set as \'month ago\'', function() {
                var query = 'date> month ago';
                var result = smartFilter(runs, query, runsFields);
                expect(result).to.have.length(2);
            });

            it('shpuld filter runs when date is set as \'day ago', function() {
                var query = 'date<day ago';
                var result = smartFilter(runs, query, runsFields);
                expect(result).to.have.length(39);
            });

        });
    });
});
