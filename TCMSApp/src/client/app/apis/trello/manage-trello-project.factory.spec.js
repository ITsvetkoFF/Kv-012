/* jshint -W117, -W030 */
describe('manage-trello-project factory', function () {
    'use strict';

    beforeEach(function () {
        bard.appModule('app.trello');
        bard.inject('ManageTrelloProject', 'Trello');
    });

    describe('trello instances creation', function () {

        describe('board creation', function () {
            var board, board2;

            beforeEach(function () {
                board = new ManageTrelloProject.Board();
                board2 = new ManageTrelloProject.Board('board');
            });

            it('should create Board instance with name "board"', function () {
                expect(board2.name).to.equals('board');
            });

            it('should create Board instance with name "unnamed board"', function () {
                expect(board.name).to.equals('unnamed board');
            });

            it('should create Board.lists with length = 0', function () {
                expect(board.lists).to.have.length(0);
            });

            it('should create Board.labels with length = 0', function () {
                expect(board.labels).to.have.length(0);
            });
        });

        describe('list creation', function () {
            var list, list2;

            beforeEach(function () {
                list = new ManageTrelloProject.List();
                list2 = new ManageTrelloProject.List('list');
            });

            it('should create List instance with name "list"', function () {
                expect(list2.name).to.equals('list');
            });

            it('should create List instance with name "unnamed list"', function () {
                expect(list.name).to.equals('unnamed list');
            });

            it('should create List.cards with length = 0', function () {
                expect(list.cards).to.have.length(0);
            });
        });

        describe('label creation', function () {
            var label, label2;

            beforeEach(function () {
                label = new ManageTrelloProject.Label();
                label2 = new ManageTrelloProject.Label('label2', 'green');
            });

            it('should create Label instance with name "label"', function () {
                expect(label2.name).to.equals('label2');
            });

            it('should create Label instance with name "label"', function () {
                expect(label.name).to.equals('label');
            });

            it('should create Label instance with name "label"', function () {
                expect(label.color).to.equals(null);
            });

            it('should create Label.color with length = 0', function () {
                label2.color.should.equals('green');
            });
        });

        describe('work with lists', function () {

            it('should return array with same items for Backlog', function () {
                var lists = ManageTrelloProject.getBacklogLists();
                lists.map(function (list) {
                    expect(list).to.have.property('icon');
                    expect(list).to.have.property('name');
                    expect(list).to.have.property('ticked');
                });
            });

            it('should return array with same items for Working', function () {
                var lists = ManageTrelloProject.getWorkingLists();
                lists.map(function (list) {
                    expect(list).to.have.property('icon');
                    expect(list).to.have.property('name');
                    expect(list).to.have.property('ticked');
                });
            });
        });
    });
});
