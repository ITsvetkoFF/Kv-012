/* jshint -W117, -W030 */
describe("smart-filter directive", function(){
    var filterElement, scope;

    beforeEach(function(){
        bard.appModule('app.core');
        bard.inject('$rootScope', '$compile', 'filterFields');
        scope = $rootScope.$new();
        var elementTemplate = mockData.getFilterDirectiveTmpl();
        filterElement = $compile(elementTemplate)(scope);
        scope.$digest();
    });

    describe("when filtering runs", function(){
        var allKeys;

        beforeEach(function(){
            allKeys = Object.keys(filterFields.runs.getFields());
        });

        it("should show all keys when typed one character", function(){
            filterElement.find('INPUT')[0].value = 'd';
            scope.filterQuery = 'd';
            scope.$digest();
            expect(filterElement.scope().hintKeys).to.deep.equal(allKeys);
        });

        it("should show only 'date' hint when typed 'da'", function(){
            filterElement.find('INPUT')[0].value = 'da';
            scope.filterQuery = 'da';
            scope.$digest();
            expect(filterElement.scope().hintKeys).to.deep.equal(['date']);
        });

        it("should show hints with operators when key entered completely", function(){
            filterElement.find('INPUT')[0].value = 'date';
            scope.filterQuery = 'date';
            scope.$digest();
            expect(filterElement.scope().hintKeys).to.deep.equal(['date:', 'date>', 'date<', 'date=']);
        });

        it("should hide hints when user enters value of key", function(){
            filterElement.find('INPUT')[0].value = 'name: e';
            scope.filterQuery = 'name: e';
            scope.$digest();
            expect(filterElement.scope().hintKeys).to.have.length(0);
        });

        // ...even if it's continuation of value
        it("should show hints again when user enters second word after key", function(){
            filterElement.find('INPUT')[0].value = 'author: Julie n';
            scope.filterQuery = 'author: Julie n';
            scope.$digest();
            expect(filterElement.scope().hintKeys).to.deep.equal(allKeys);
        })
    })
})
