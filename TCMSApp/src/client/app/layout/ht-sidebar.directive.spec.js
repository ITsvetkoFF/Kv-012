/* jshint -W117, -W030 */
/* jshint multistr:true */
describe('htSidebar directive: ', function () {
    var sidebarElement, compile, scope, syncProjAndOrg, findProjects;

    beforeEach(function() {
        bard.appModule('app.layout', 'templates');
        bard.inject('$controller', '$rootScope', '$compile', 'createProjectFactory', 'sidebarFactory', 'authservice');
        scope = $rootScope.$new();
        var elementTemplate = mockData.getSidebarDirectiveTmpl();
        sidebarElement = $compile(elementTemplate)(scope);
        var sinc = sinon.stub(sidebarFactory, 'findProjects').returnsThis({1:'1', 2:'2'});

        var fakeresolver = function() {
            return {
                then: sinc
            };
        };

        sinon.stub(authservice, 'authorize').returnsThis(true);
        sinon.stub(createProjectFactory, 'syncProjAndOrg').returns(fakeresolver());

        //scope.$digest();
    });

    /// tests ///
    describe('syncronizing projects', function () {

        it('directive should be created', function () {
            var sidebar = sidebarElement.find('.sidebar');
            expect(sidebar).to.be.defined;
        });

    });

});
