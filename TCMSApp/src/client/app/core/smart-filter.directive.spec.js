/* jshint -W117, -W030 */
describe('smart-filter directive', function() {
    var filterElement, scope;

    beforeEach(function() {
        bard.appModule('app.core', 'templates');
        bard.inject('$rootScope', '$compile', 'filterFields');
        scope = $rootScope.$new();
        var elementTemplate = mockData.getFilterDirectiveTmpl();
        filterElement = $compile(elementTemplate)(scope);
        scope.$digest();
    });

    describe('when filtering runs', function() {
        var allKeys, inputElement;

        beforeEach(function() {
            allKeys = Object.keys(filterFields.runs.getFields());
            inputElement = filterElement.find('INPUT')[0];
        });

        it('should compile directive with INPUT element', function() {
            expect(inputElement).to.be.defined;
        });

        it('should load the filter fields with all required keys', function() {
            expect(allKeys).to.contain('name', 'date', 'environment', 'env', 'envFull', 'author', 'build', 'status');
        });

        it('should show all keys when typed one character', function() {
            inputElement.value = 'd';
            scope.filterQuery = 'd';
            scope.$digest();
            expect(filterElement.isolateScope().hintKeys).to.deep.equal(allKeys);
        });

        it('should show only \'date\' hint when typed \'da\'', function() {
            inputElement.value = 'da';
            scope.filterQuery = 'da';
            scope.$digest();
            expect(filterElement.isolateScope().hintKeys).to.deep.equal(['date']);
        });

        it('should show hints with operators when key entered completely', function() {
            inputElement.value = 'date';
            scope.filterQuery = 'date';
            scope.$digest();
            expect(filterElement.isolateScope().hintKeys).to.deep.equal(['date:', 'date>', 'date<', 'date=']);
        });

        it('should hide hints when user enters value of key', function() {
            inputElement.value = 'name: e';
            scope.filterQuery = 'name: e';
            scope.$digest();
            expect(filterElement.isolateScope().hintKeys).to.have.length(0);
        });

        // ...even if it's continuation of value
        it('should show hints again when user enters second word after key', function() {
            inputElement.value = 'author: Julie n';
            scope.filterQuery = 'author: Julie n';
            scope.$digest();
            expect(filterElement.isolateScope().hintKeys).to.deep.equal(allKeys);
        });

        it('should show hints when user enters third word after key', function() {
            inputElement.value = 'author: Kshlerin Julie e';
            scope.filterQuery = 'author: Kshlerin Julie e';
            scope.$digest();
            expect(filterElement.isolateScope().hintKeys).to.deep.equal(allKeys);
        });

        it('should work when query is selected from filter dropdown', function() {
            filterElement.isolateScope().fastFilter('status=failed');
            scope.$digest();
            expect(scope.filterQuery).to.equal('status=failed');
            expect(inputElement.value).to.equal('status=failed');
        });
    });
});
