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
    "use strict";

    angular
        .module('app.trello')
        .factory('TrelloTeamFactory', TrelloTeamFactory);

    TrelloTeamFactory.$inject = ['logger', 'authservice', '$rootScope'];

    function TrelloTeamFactory(logger, authservice, $rootScope) {

        /**
         * Variable, that will be returned by the factory
         * @memberOf trelloTeamFactory;
         * @type {{auth: teamMembersFactory.auth, getUsers: teamMembersFactory.getUsers, deleteUser: teamMembersFactory.deleteUser, addUser: teamMembersFactory.addUser}}
         */
        var result = {
            getUsers: getUsers,
            deleteUser: deleteUser,
            addUser: addUser,
            getMe: _getMe,
            auth: authservice.authorize
        };

        var me;

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
        function getUsers(Trello, users, organization) {

            users.length = 0;

            var length;

            console.log("Trello auth: " + Trello.authorized());
            Trello.rest('GET', 'organizations/' + organization + '/members',
                {
                    fields: 'all',
                    //key: Trello.key
                },
                function (res) {
                    if (res != 0) {
                        length = res.length;

                        if (res.length != 0) {
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

            console.log("Trello authorized: " + Trello.authorized());

        }

        function _setAvatarUrl(user) {
            if (!user.avatarHash) {
                user.avatarImgUrl = "images/img_not_found.gif";
            } else {
                user.avatarImgUrl = "https://trello-avatars.s3.amazonaws.com/" + user.avatarHash + "/170.png";
            }

        }

        /**
         * Adds users to Trello
         * @memberOf trelloTeamFactory;
         * @param {Object} newUser option object `{newName: string, newEmail: string, newRole: string}`
         * @param {Array.<User>} users updatable array of users
         * @param {String} organization name of the current project
         */
        function addUser(Trello, newUser, users, organization) {

            var name = newUser.newName;

            Trello.rest('PUT', 'organizations/' + organization + '/members',
                {
                    fullName: newUser.newName,
                    email: newUser.newEmail,
                    type: newUser.newRole,
                    //key: Trello.key
                },
                function (res) {
                    logger.success('User ' + name + ' added');

                    getUsers(Trello, users, organization);
                },
                function (err) {
                    logger.error('', err, err.responseText);
                });
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
        function deleteUser(Trello, users, index, organization) {

            var deletedUser = users[index];

            if ( me ) {

                if ( me.id == deletedUser.id ) {

                    logger.warning('You can\'t delete yourself =)', '', 'Ooops!');

                } else {
                    Trello.rest('DELETE', 'organizations/' + organization + '/members/' + users[index].id,
                        {
                            //key: Trello.key
                        },
                        function (res) {
                            logger.success('User ' + deletedUser.fullName + ' deleted');
                            getUsers(Trello, users, organization);
                        },
                        function (err) {
                            logger.error('', err, err.responseText);
                        });
                }
            } else {
                logger.error("trello/me not loaded");
            }

            return deletedUser;
        }

        /**
         * Sets local `me` to current user From Trello
         * @memberOf trelloTeamFactory;
         */
        function _getMe(Trello) {
            Trello.rest('GET', 'members/me',
                {
                    //key: Trello.key
                },
                function (res) {
                    logger.info('', res, 'Hello ' + res.fullName);
                    me = res;
                },
                function (err) {
                    logger.error('Error in _getMe()', err, err.responseText);
                });
        }

        return result;
    }
})();
