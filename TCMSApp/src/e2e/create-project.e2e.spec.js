'use strict';

describe('create project lifecycle e2e', function() {
    /**
    * If true, Protractor will not attempt to synchronize with the page before
    * performing actions. This can be harmful because Protractor will not wait
    * until $timeouts and $http calls have been processed, which can cause
    * tests to become flaky. This should be used only when necessary, such as
    * when a page continuously polls an API using $timeout.
    *
    * @type {boolean}
    */
    browser.ignoreSynchronization = false;

    var btnAddProject = element(by.id('btnAddProject'));
    var btnCreateProject = element(by.id('btnCreateProject'));
    var inputProjectName = element(by.model('vmModal.projectName'));
    var toastError = element(by.xpath("//div[@class='toast toast-error']/div/div[@class='toast-message']"));
    var toastSuccess = element(by.xpath("//div[@class='toast toast-success']/div/div[@class='toast-message']"));
    var projectInApp = element(by.xpath("//li[@class='nlightblue fade-selection-animation ng-scope'][1]/a[@class='ng-binding']"));
    var anotherProjectInApp = element(by.xpath("//li[@class='nlightblue fade-selection-animation ng-scope'][2]/a[@class='ng-binding']"));
    var logInTrello = element(by.css('.primary'));
    var userTrello = element(by.id('user'));
    var passwordTrello = element(by.id('password'));
    var loginTrelloConfirm = element(by.id('login'));
    var allowTrello = element(by.css("[value='Allow']"));
    var suitePage = element(by.id('btnAddSuite'));
    var teamPage = element(by.id('btnTeam'));
    var projectTrello = element(by.xpath("//div[@class='boards-page-board-section'][2]/div[@class='boards-page-board-section-header']\
    /h3[@class='boards-page-board-section-header-name']"));
    var settingsTrello = element(by.xpath("//div[@class='boards-page-board-section'][2]/div[@class='boards-page-board-section-header']\
    /div[@class='boards-page-board-section-header-options']/a[@class='boards-page-board-section-header-options-item dark-hover js-view-org-settings']\
    /span[@class='boards-page-board-section-header-options-item-name']"));
    var delTrello = element(by.css('.js-confirm-delete-org'));
    var delTrelloConfirm = element(by.css('.js-confirm'));


    it('warning for an empty project name', function() {
        browser.get('http://localhost:8001/');
        btnAddProject.click();
        btnCreateProject.click();
        expect(toastError.getText()).toEqual('Please fill the project name.');
    });

    it('create & check project', function() {
        projectLifecycleStart('e2e test project', 'http://localhost:8001/tests/list', suitePage);
    });

    it('create & check another project', function() {
        projectLifecycleStart('another e2e test project', 'http://localhost:8001/admin/team', teamPage);
    });

    it('check & delete another project in Trello', function() {
        projectLifecycleEnd('another e2e test project');
    });

    it('check & delete project in Trello', function() {
        projectLifecycleEnd('e2e test project');
    });


    function projectLifecycleStart(name, url, page) {
        var trigger = page == suitePage;
        var checkProject = trigger ? projectInApp : anotherProjectInApp;
        browser.get('http://localhost:8001/');
        browser.manage().timeouts().implicitlyWait(5000);
        btnAddProject.click();
        inputProjectName.sendKeys(name);
        btnCreateProject.click();
        browser.ignoreSynchronization = true;

        browser.getAllWindowHandles().then(function(handles){
            browser.switchTo().window(handles[1]).then(function(){
                //do your stuff on the pop up window
                if (trigger) {
                    logInTrello.click();
                    userTrello.sendKeys('testtestovich1');
                    passwordTrello.sendKeys('testtest123');
                    loginTrelloConfirm.click();
                }
                allowTrello.click();
            });
            browser.switchTo().window(handles[0]).then(function(){
                //do  stuff in parent window
                btnCreateProject.click();
                expect(toastSuccess.getText()).toEqual(name + ' created');
                page.click();
                expect(checkProject.getText()).toEqual(name);
                expect(browser.getCurrentUrl()).toEqual(url);
                browser.executeScript('localStorage.clear();');
            });
        });

    }

    function projectLifecycleEnd(name) {
        browser.get('http://trello.com');
        expect(projectTrello.getText()).toEqual(name);
        settingsTrello.click();
        delTrello.click();
        delTrelloConfirm.click();
    }

});
