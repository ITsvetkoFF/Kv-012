/**
 * @ngdoc factory
 * @name trelloTeamFactory
 * @memberOf app.trello
 * @description
 * Defines some methods for manipulating Trello members
 * @example
 * ```
 * ...$inject = [..., 'TrelloTeamFactory'];
 *
 * function someService(TrelloTeamFactory) {
 *     TrelloTeamFactory.method();
 * }
 * ```
 */

(function () {
    'use strict';

    angular
        .module('app.trello')
        .factory('TrelloTeamFactory', TrelloTeamFactory);

    TrelloTeamFactory.$inject = ['logger', 'Trello', '$q', 'user'];

    function TrelloTeamFactory(logger, Trello, $q, user) {

        var result = {
            getUsers: getUsers,
            deleteUser: deleteUser,
            addUser: addUser
        };

        function getUsers(users) {

            users.length = 0;

            var length;

            Trello.rest('GET', 'organizations/' + user.currentProject.trelloOrganizationId + '/members',
                {
                    fields: 'all'
                },
                function (res) {
                    if (res !== 0) {
                        length = res.length;

                        if (res.length !== 0) {
                            for (var i = 0; i < res.length; i++) {
                                users.push(res[i]);
                                _setAvatarUrl(res[i]);
                            }
                        }
                    } else {
                        length = 0;
                    }
                    logger.success(length + ' users successfully loaded');
                },
                function (err) {
                    logger.error('Select Trello project please', '', err.responseText);
                });

        }

        function _setAvatarUrl(user) {
            if (!user.avatarHash) {
                user.avatarImgUrl = 'images/img_not_found.gif';
            } else {
                user.avatarImgUrl = 'https://trello-avatars.s3.amazonaws.com/' + user.avatarHash + '/170.png';
            }

        }

        function addUser(newUser) {

            var deferred = $q.defer();

            Trello.rest('PUT', 'organizations/' + user.currentProject.trelloOrganizationId + '/members',
                {
                    fullName: newUser.newName,
                    email: newUser.newEmail,
                    type: newUser.newRole
                },
                function (res) {
                    deferred.resolve(res);
                    logger.success('User added');
                },
                function (err) {
                    logger.error('', err, err.responseText);
                });

            return deferred.promise;
        }

        function deleteUser(users, index) {

            var deletedUser = users[index];

            if (user.idTrello) {

                if (user.idTrello === deletedUser.id) {

                    logger.warning('You can\'t delete yourself =)', '', 'Ooops!');

                } else {
                    Trello.rest('DELETE', 'organizations/' + user.currentProject.trelloOrganizationId +
                        '/members/' + users[index].id,
                        {},
                        function (res) {
                            logger.success('User ' + res.fullName + ' deleted');
                            getUsers(users);
                        },
                        function (err) {
                            logger.error('', err, err.responseText);
                        });
                }
            } else {
                logger.error('trello/me not loaded');
            }

            return deletedUser;
        }

        return result;
    }
})();
