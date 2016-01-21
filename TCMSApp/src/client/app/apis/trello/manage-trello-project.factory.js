(function () {
    'use strict';

    angular
        .module('app.trello')
        .factory('ManageTrelloProject', ManageTrelloProject);

    ManageTrelloProject.$inject = ['logger', 'Trello', '$q', 'TrelloTeamFactory'];

    function ManageTrelloProject(logger, Trello, $q, TrelloTeamFactory) {

        return {
            getBacklogLists: getBacklogInputLists,
            getWorkingLists: getWorkingInputLists,
            Board: Board,
            List: List,
            Label: Label,
            addBoard: addBoard,
            getBoards: getBoards,
            setBoardLists: setBoardLists,
            getBoardLists: getBoardLists,
            refreshBoards: refreshBoards,
            addList: addList,
            openList: openList,
            closeList: closeList,
            addLabel: addLabel
        };

        function openList(idList) {
            var deferred = $q.defer();
            Trello.put('lists/' + idList + '/closed', {value: false})
                .then(function(res) {

                    deferred.resolve(res);
                }, function(err) {
                    logger.error(err.responseText);
                });
            return deferred.promise;
        }

        function setBoardLists(board) {

            board.inputLists = [];

            Trello.get('boards/' + board.id + '/lists')
                .then(function(lists) {
                    for (var i = 0; i < lists.length; i++) {
                        board.inputLists.push({name: lists[i].name, ticked: true , id: lists[i].id});
                    }
                }, function(err) {
                    logger.error(err.responseText);
                });
        }

        function refreshBoards(vmboards) {
            TrelloTeamFactory.getCurrentProject().then(function (currentProject) {
                Trello.get('organizations/' + currentProject.trelloOrganizationId + '/boards')
                    .then(function (boards) {
                        vmboards.length = 0;
                        for (var i = 0; i < boards.length; i++) {
                            if (boards[i].name === 'Backlog') {
                                boards[i].inputLists = getBacklogInputLists();
                            }
                            if (boards[i].name === 'Working') {
                                boards[i].inputLists = getWorkingInputLists();
                            }

                            vmboards.push(boards[i]);
                        }
                    }, function (err) {
                        logger.error(err.responseText);
                    });
            });
        }

        function getBacklogInputLists() {
            return [
                {name: 'Product backlog',   ticked: true},
                {name: 'Tests',             ticked: true},
                {name: 'Defects',           ticked: true},
                {name: 'Enhancements',      ticked: true},
                {name: 'Implementations',   ticked: true},
                {name: 'Ideas',             ticked: true}
            ];
        }

        function getWorkingInputLists() {
            return [
                {name: 'To be tested',      ticked: true},
                {name: 'To Do',             ticked: true},
                {name: 'Doing',             ticked: true},
                {name: 'Ready to verify',   ticked: true},
                {name: 'Testing',           ticked: true},
                {name: 'Done',              ticked: true}
            ];
        }

        function closeList(idList) {

            var deferred = $q.defer();

            Trello.put('lists/' + idList + '/closed', {value: true})
                .then(function (res) {

                    deferred.resolve(res);
                }, function (err) {
                    logger.error(err.responseText);
                });

            return deferred.promise;
        }

        function addBoard(board, idOrganization) {

            Trello.post('boards', {
                name: board.name,
                idOrganization: idOrganization
            }).then(function (res) {

                var idBoard = res.id;

                if (board.lists.length !== 0) {
                    for (var i = 0; i < board.lists.length; i++) {
                        addList(board.lists[i], idBoard);
                    }
                }

                if (board.labels.length !== 0) {
                    for (var j = 0; j < board.labels.length; j++) {
                        addLabel(board.labels[j], idBoard);
                    }
                }

                return res;
            }, function (err) {
                logger.error(err.responseText, '', 'Board have not posted');
            });
        }

        function addList(list, idBoard) {
            Trello.post('lists', {
                name: list.name,
                idBoard: idBoard
            }).then(function (res) {
                return res;
            }, function (err) {
                logger.error(err.responseText, '', 'List have not posted');
            });
        }

        function getBoardLists(idBoard) {
            var deferred = $q.defer();

            Trello.get('boards/' + idBoard + '/lists')
                .then(function (lists) {
                    deferred.resolve(lists);
                }, function (err) {
                    logger.error(err.responseText);
                });
            return deferred.promise;
        }

        function addLabel(label, idBoard) {
            if (label instanceof Label) {
                Trello.post('labels', {
                    name: label.name,
                    color: label.color,
                    idBoard: idBoard
                }).then(function (res) {
                    return res;
                }, function (err) {
                    logger.error(err.responseText, '', 'Label have not posted');
                });
            } else {
                logger.error('addLabel error');
            }
        }

        function getBoards(idOrganization) {
            Trello.get('organizations/' + idOrganization + '/boards')
                .then(function (res) {
                    return res;
                }, function (err) {

                });
        }

        function Board(name) {
            this.name = name || 'unnamed board';
            this.lists = [];
            this.labels = [];
        }

        function List(name) {
            this.name = name || 'unnamed list';
            this.cards = [];
        }

        function Label(name, labelColor) {
            this.name = name || 'label';
            this.color = labelColor || null;
        }
    }

})();
