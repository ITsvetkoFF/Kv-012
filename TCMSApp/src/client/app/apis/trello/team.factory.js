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

    TrelloTeamFactory.$inject = ['logger', 'authservice', '$rootScope', 'Trello', '$q', '$http'];

    function TrelloTeamFactory(logger, authservice, $rootScope, Trello, $q, $http) {

        /**
         * Variable, that will be returned by the factory
         * @memberOf trelloTeamFactory;
         * {{auth: teamMembersFactory.auth,
         * getUsers: teamMembersFactory.getUsers,
         * deleteUser: teamMembersFactory.deleteUser,
         * addUser: teamMembersFactory.addUser}}
         */
        var result = {
            getUsers: getUsers,
            deleteUser: deleteUser,
            addUser: addUser,
            getMe: getMe,
            getCurrentProject: getCurrentProject
        };

        // temporary method for my needs
        function getCurrentProject() {

            var deferred = $q.defer();

            $http.get('/api/v1/projects')
                .success(function (data) {
                    deferred.resolve(data[data.length - 1]);
                });

            return deferred.promise;
        }

        /**
         * Update array of users
         * @memberOf trelloTeamFactory;
         * @param {Array.<User>} users updatable array of users
         * @param {String} organization name of the current project
         * @param {String} Trello name of the current project
         * @example
         * ```
         * getUsers(vm.users, vm.organization);
         * ```
         */
        function getUsers(users) {

            users.length = 0;

            var length;

            getCurrentProject().then(function (currentProject) {
                Trello.rest('GET', 'organizations/' + currentProject.trelloOrganizationId + '/members',
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
                        logger.error('Something wrong with users loading...', '', err.responseText);
                    });
            }, function (err) {
                logger.error(err.responseText);
            });
        }

        function _setAvatarUrl(user) {
            if (!user.avatarHash) {
                user.avatarImgUrl = 'images/img_not_found.gif';
            } else {
                user.avatarImgUrl = 'https://trello-avatars.s3.amazonaws.com/' + user.avatarHash + '/170.png';
            }

        }

        /**
         * Adds users to Trello
         * @memberOf trelloTeamFactory;
         * @param {Object} newUser option object `{newName: string, newEmail: string, newRole: string}`
         * @param {Array.<User>} users updatable array of users
         * @param {String} organization name of the current project
         */
        function addUser(newUser) {

            var deferred = $q.defer();

            getCurrentProject().then(function (currentProject) {
                Trello.rest('PUT', 'organizations/' + currentProject.trelloOrganizationId + '/members',
                    {
                        fullName: newUser.newName,
                        email: newUser.newEmail,
                        type: newUser.newRole
                    },
                    function (res) {
                        deferred.resolve(res);
                        logger.success('User ' + res.fullName + ' added');
                    },
                    function (err) {
                        logger.error('', err, err.responseText);
                    });
            }, function (err) {
                logger.error(err.responseText);
            });

            return deferred.promise;
        }

        /**
         * Deletes users from Trello and update existing array of users
         * @memberOf trelloTeamFactory
         * @param {Array.<User>} users updatable array of users
         * @param {Integer} index index of deleted user
         * @param {String} organization name of the current project
         * @returns {*}
         * @example
         * ```
         * deleteUser(vm.users, $index, vm.organization)
         * ```
         */
        function deleteUser(users, index) {

            var deletedUser = users[index];

            getMe().then(function (me) {
                if (me) {
                    if (me.id === deletedUser.id) {
                        logger.warning('You can\'t delete yourself =)', '', 'Ooops!');
                    } else {
                        getCurrentProject()
                            .then(function (currentProject) {
                                Trello.rest('DELETE', 'organizations/' + currentProject.trelloOrganizationId +
                                    '/members/' + users[index].id,
                                    {},
                                    function (res) {
                                        logger.success('User ' + res.fullName + ' deleted');
                                        getUsers(users);
                                    },
                                    function (err) {
                                        logger.error('', err, err.responseText);
                                    });
                            }, function (err) {
                                logger.error(err.responseText);
                            });
                    }
                } else {
                    logger.error('trello/me not loaded');
                }
            }, function (err) {
                logger.error(err.responseText);
            });

            return deletedUser;
        }

        /**
         * Sets local `me` to current user From Trello
         * @memberOf trelloTeamFactory;
         */
        function getMe() {
            var deferred = $q.defer();

            Trello.get('members/me')
                .then(function (res) {
                    deferred.resolve(res);
                }, function (err) {
                    logger.error('Error in _getMe()', err, err.responseText);
                });

            return deferred.promise;
        }

        return result;
    }
})();
