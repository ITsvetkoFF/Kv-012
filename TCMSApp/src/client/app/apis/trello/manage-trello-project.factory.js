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
            addLabel: addLabel,
            changeList: changeList
        };

        function changeList(data) {
            var deferred = $q.defer();
            if (data.ticked) {
                openList(data)
                    .then(function (res) {
                        deferred.resolve(res);
                    }, function (err) {
                    });
            } else {
                closeList(data)
                    .then(function (res) {
                        deferred.resolve(res);
                    }, function (err) {
                    });
            }

            return deferred.promise;
        }

        function openList(data) {
            var deferred = $q.defer();

            Trello.put('lists/' + data.id + '/closed', {value: false})
                .then(function (list) {
                    deferred.resolve(list);
                }, function (err) {
                    logger.error(err.responseText);
                });

            return deferred.promise;
        }

        function closeList(data) {
            var deferred = $q.defer();
            Trello.put('lists/' + data.id + '/closed', {value: true})
                .then(function (list) {
                    deferred.resolve(list);
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
                .then(function (currentProject) {
                    getBoardByName(model.name, currentProject)
                        .then(function (board) {
                            model.id = board.id;
                            // get CLOSED and OPEND lists
                            getBoardLists(board.id)
                                .then(function (lists) {
                                    if (model.name === 'Backlog') {
                                        // write mockup lists
                                        model.inputLists = getBacklogInputLists();
                                        //model.outputLists = model.inputLists;

                                        // compare and midify inputLists (mockup lists) with trello lists
                                        setUpLists(lists, model);
                                    }
                                    if (model.name === 'Working') {
                                        // write mockup lists
                                        model.inputLists = getWorkingInputLists();
                                        //model.outputLists = model.inputLists;
                                        setUpLists(lists, model);
                                    }
                                }, function (err) {
                                    console.error(err.responseText);
                                });
                        }, function (err) {
                            console.error(err.responseText);
                        });
                }, function (err) {
                    console.error(err.responseText);
                });
        }

        function getBoardByName(name, currentProject) {
            var deferred = $q.defer();
            Trello.get('organizations/' + currentProject.trelloOrganizationId + '/boards')
                .then(function (boards) {

                    boards.map(function (board) {
                        if ((!board.closed) && (board.name === name)) {
                            deferred.resolve(board);
                        }
                    });

                }, function (err) {
                    console.error(err.responseText);
                });
            return deferred.promise;
        }

        function setUpLists(trelloLists, model) {
            model.inputLists.map(function (modelList) {
                trelloLists.map(function (trelloList) {

                    // modelLists - 1 from all mockup lists
                    // якщо в трело немає такого ліста то айдідіста і борда до нього не прикріпляться,
                    // отже в елсе треба створити новий ліст і тоді прикріпити до модельки айді з респонзу
                    if (modelList.name == trelloList.name) {
                        if (!trelloList.closed) {
                            modelList.ticked = true;
                            modelList.id = trelloList.id;
                            modelList.idBoard = model.id;
                        } else {
                            modelList.ticked = false;
                            modelList.id = trelloList.id;
                            modelList.idBoard = model.id;
                        }
                    }
                })
            });
            //model.outputLists = model.inputLists;
        }

        function getBacklogInputLists() {
            return [
                {name: 'Product backlog', ticked: true},
                {name: 'Tests', ticked: false},
                {name: 'Defects', ticked: true},
                {name: 'Enhancements', ticked: true},
                {name: 'Implementations', ticked: false},
                {name: 'Ideas', ticked: true}
            ];
        }

        function getWorkingInputLists() {
            return [
                {name: 'To be tested', ticked: true},
                {name: 'To Do', ticked: true},
                {name: 'Doing', ticked: true},
                {name: 'Ready to verify', ticked: false},
                {name: 'Testing', ticked: false},
                {name: 'Done', ticked: true}
            ];
        }

        function addBoard(board, idOrganization) {
            var deferred = $q.defer();
            Trello.post('boards', {
                name: board.name,
                idOrganization: idOrganization
            }).then(function (tBoard) {
                getBoardLists(tBoard.id)
                    .then(function (tLists) {
                        tLists.map(function (tlist) {
                            closeList(tlist.id);
                        });
                        board.lists.map(function (bList) {
                            addList(bList, tBoard.id)
                                .then(function (tList) {
                                    board.lists.map(function (bbList) {
                                        if (bbList.name == tList.name) {
                                            if (bbList.closed) {
                                                closeList(tList.id);
                                            }
                                        }
                                    });
                                }, function (err) {
                                    logger.error(err.responseText);
                                });
                        });
                    }, function (err) {
                        logger.error(err.responseText);
                    });
                deferred.resolve(board);
            }, function (err) {
                logger.error(err.responseText, '', 'Board have not posted');
            });
            return deferred.promise;
        }

        function closeAllLists(idBoard) {
            var deferred = $q.defer();
            getBoardLists(idBoard)
                .then(function (lists) {
                    lists.map(function (list) {
                        closeList(list.id);
                    });
                    deferred.resolve(lists);
                }, function (err) {
                    logger.error(err.responseText);
                });
            return deferred.promise;
        }

        function addList(list, idBoard) {
            var deferred = $q.defer();
            Trello.post('lists', {
                name: list.name,
                idBoard: idBoard
            }).then(function (res) {
                deferred.resolve(res);
            }, function (err) {
                logger.error(err.responseText, '', 'List have not posted');
            });
            return deferred.promise;
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
