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
            refreshBoard: refreshBoard,
            addList: addList,
            openList: openList,
            closeList: closeList,
            addLabel: addLabel
        };

        function openList(idList) {
            var deferred = $q.defer();
            Trello.put('lists/' + idList + '/closed', {value: false})
                .then(function (res) {
                    deferred.resolve(res);
                }, function (err) {
                    logger.error(err.responseText);
                });
            return deferred.promise;
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

        function setBoardLists(board) {

            board.inputLists = [];

            Trello.get('boards/' + board.id + '/lists')
                .then(function (lists) {
                    for (var i = 0; i < lists.length; i++) {
                        board.inputLists.push({name: lists[i].name, ticked: true, id: lists[i].id});
                    }
                }, function (err) {
                    logger.error(err.responseText);
                });
        }

        function refreshBoard(model) {
            TrelloTeamFactory.getCurrentProject()
                .then(function(currentProject) {
                    getBoardByName(model.name, currentProject)
                        .then(function(board) {

                            getBoardLists(board.id)
                                .then(function(lists) {

                                    if (model.name === 'Backlog') {
                                        model.inputLists = getBacklogInputLists();
                                        //model.outputLists = model.inputLists;
                                        setUpLists(lists, model.inputLists);
                                    }
                                    if (model.name === 'Working') {
                                        model.inputLists = getWorkingInputLists();
                                        //model.outputLists = model.inputLists;
                                        setUpLists(lists, model.inputLists);
                                    }

                                }, function(err) {
                                    console.error(err.responseText);
                                });

                        }, function(err) {
                            console.error(err.responseText);
                        });
                }, function(err) {
                    console.error(err.responseText);
                });
        }

        function getBoardByName(name, currentProject) {
            var deferred = $q.defer();
            Trello.get('organizations/' + currentProject.trelloOrganizationId + '/boards')
                .then(function(boards) {

                    boards.map(function(board) {
                        if ((!board.closed) && (board.name === name)) {
                            deferred.resolve(board);
                        }
                    });

                }, function(err) {
                    console.error(err.responseText);
                });
            return deferred.promise;
        }

        function setUpLists(trelloLists, modelLists) {
            modelLists.map(function(modelList) {
                trelloLists.map(function(trelloList) {
                    if (modelList.name == trelloList.name) {
                        if (!trelloList.closed) {
                            modelList.ticked = true;
                            modelList.id = trelloList.id;
                        } else {
                            modelList.id = trelloList.id;
                        }
                    }
                });
            });
        }

        function getBacklogInputLists() {
            return [
                {name: 'Product backlog', ticked: false},
                {name: 'Tests', ticked: false},
                {name: 'Defects', ticked: false},
                {name: 'Enhancements', ticked: false},
                {name: 'Implementations', ticked: false},
                {name: 'Ideas', ticked: false}
            ];
        }

        function getWorkingInputLists() {
            return [
                {name: 'To be tested', ticked: false},
                {name: 'To Do', ticked: false},
                {name: 'Doing', ticked: false},
                {name: 'Ready to verify', ticked: false},
                {name: 'Testing', ticked: false},
                {name: 'Done', ticked: false}
            ];
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

            Trello.get('boards/' + idBoard + '/lists', {filter: 'all'})
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
