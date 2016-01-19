/**
 * @ngdoc factory
 * @name manageTrelloProject
 * @memberOf app.trello
 * @description
 * Defines Trello boards, lists, labels e.t. from application
 * @example
 * ```
 * ...$inject = [..., 'ManageTrelloProject'];
 *
 * var newBoard = new ManageTrelloProject.Board("Name");
 * ManageTrelloProject.addBoard(newBoard, idOrganization);
 * ```
 */
(function () {
    'use strict';

    angular
        .module('app.trello')
        .factory('ManageTrelloProject', ManageTrelloProject);

    ManageTrelloProject.$inject = ['logger', 'Trello', '$q'];

    function ManageTrelloProject(logger, Trello, $q) {
        return {
            Board: Board,
            List: List,
            Label: Label,
            addBoard: addBoard,
            addList: addList,
            addLabel: addLabel
        };

        /**
         *
         * @param board
         * @param idOrganization
         */
        function addBoard(board, idOrganization) {

            Trello.post('boards', {
                name: board.name,
                idOrganization: idOrganization
            }).then(function (res) {

                var idBoard = res.id;

                if (board.lists.length != 0) {
                    for (var i = 0; i < board.lists.length; i++) {
                        addList(board.lists[i], idBoard);
                    }
                }

                if (board.labels.length != 0) {
                    for (var i = 0; i < board.labels.length; i++) {
                        addLabel(board.labels[i], idBoard);
                    }
                }

                return res;
            }, function (err) {
                logger.error(err.responseText, '', 'Board have not posted');
            });
        }

        /**
         *
         * @param idList
         */
        function closeList(idList) {
            Trello
                .put('lists/' + idList, {
                    closed: true
                })
                .then(
                function (res) {

                },
                function (err) {

                });
        }

        /**
         *
         * @param idBoard
         */
        function getLists(idBoard) {
            Trello
                .get('boards/' + idBoard + '/lists')
                .then(function (res) {
                    return res;
                }, function(err) {

                });
        }

        /**
         *
         * @param idList
         * @param idCardSource
         * @param due
         * @param urlSource
         */
        function addCardCopy(idList, idCardSource, due, urlSource) {
            Trello
                .post('cards', {
                    idList: idList,
                    idCardSource: idCardSource,
                    due: due || null,
                    urlSource: urlSource || null
                })
                .then(function(res) {
                    return res;
                }, function(err) {

                });
        }

        /**
         *
         * @param newName
         * @param idOrganization
         * @param idBoardSource
         */
        function copyBoard(newName, idOrganization, idBoardSource) {
            Trello.post('boards', {
                name: newName,
                idOrganization: idOrganization,
                idBoardSource: idBoardSource
            }).then(function (res) {
                return res;
            });
        }

        /**
         *
         * @param list
         * @param idBoard
         */
        function addList(list, idBoard) {
            Trello.post('lists', {
                name: list.name,
                idBoard: idBoard
            }).then(function (res) {
                return res;
            }, function (err) {
                logger.error(err.responseText, '', 'List have not posted');
            })
        }

        /**
         *
         * @param label
         * @param idBoard
         */
        function addLabel(label, idBoard) {
            Trello.post('labels', {
                name: label.name,
                color: label.color,
                idBoard: idBoard
            }).then(function (res) {
                return res;
            }, function (err) {
                logger.error(err.responseText, '', 'Label have not posted');
            });
        }

        /**
         *
         * @param name
         * @constructor
         */
        function Board(name) {
            this.name = name || 'unnamed board';
            this.lists = [];
            this.labels = [];
        }

        /**
         *
         * @param name
         * @constructor
         */
        function List(name) {
            this.name = name || 'unnamed list';
        }

        /**
         *
         * @param name
         * @param labelColor
         * @constructor
         */
        function Label(name, labelColor) {
            this.name = name || 'label';
            this.color = labelColor || null;
        }
    }

})();
