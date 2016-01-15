/**
 * @ngdoc factory
 * @name teamMembersFactory
 * @description
 * Some methods for manipulating members in current team
 */

(function () {
    "use strict";

    angular
        .module('app.admin')
        .factory('TeamMembersFactory', TeamMembersFactory);

    TeamMembersFactory.$inject = ['Trello', 'logger'];

    function TeamMembersFactory(Trello, logger) {

        /**
         * Variable, that will be returned by the factory
         * @memberOf teamMembersFactory;
         * @type {{auth: teamMembersFactory.auth, getUsers: teamMembersFactory.getUsers, deleteUser: teamMembersFactory.deleteUser, addUser: teamMembersFactory.addUser}}
         */
        var result = {
            auth: auth,
            getUsers: getUsers,
            deleteUser: deleteUser,
            addUser: addUser,
        };

        /**
         * Trello authorize. Must be one for application. In development
         * @memberOf teamMembersFactory;
         * @example
         * ```
         * auth();
         * ```
         */

        auth();
        function auth() {
            Trello.authorize({
                type: 'popup',
                name: 'testApp',
                scope: {
                    read: true,
                    write: true,
                    account: true
                },
                expiration: 'never',
                success: function () {
                    logger.info('', '', 'Success trello auth');
                },
                error: function (err) {
                    logger.error('', '', res.responseText);
                    console.log('error auth');
                }
            });
        }

        /**
         * Update array of users
         * @memberOf teamMembersFactory;
         * @param {Array.<User>} users updatable array of users
         * @param {String} organization name of the current project
         * @example
         * ```
         * getUsers(vm.users, vm.organization);
         * ```
         */
        function getUsers(users, organization) {

            users.length = 0;

            var length;

            Trello.rest('GET', 'organizations/' + organization + '/members',
                {
                    fields: 'all'
                },
                function (res) {
                    if(res != 0) {
                        length = res.length;

                        if (res.length != 0) {
                            for (var i = 0; i < res.length; i++) {
                                users.push(res[i]);
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
        }

        /**
         * Adds users to Trello
         * @memberOf teamMembersFactory;
         * @param {Object} newUser option object `{newName: string, newEmail: string, newRole: string}`
         * @param {Array.<User>} users updatable array of users
         * @param {String} organization name of the current project
         */
        function addUser(newUser, users, organization) {

            var name = newUser.newName;

            Trello.rest('PUT', 'organizations/' + organization + '/members',
                {
                    fullName: newUser.newName,
                    email: newUser.newEmail,
                    type: newUser.newRole
                },
                function (res) {
                    logger.success('User ' + name + ' added');
                    getUsers(users, organization);
                },
                function (err) {
                    logger.error('', err, err.responseText);
                });
        }

        /**
         * Deletes users from Trello and update existing array of users
         * @memberOf teamMembersFactory
         * @param {Array.<User>} users updatable array of users
         * @param {Integer} index index of deleted user
         * @param {String} organization name of the current project
         * @returns {*}
         * @example
         * ```
         * deleteUser(vm.users, $index, vm.organization)
         * ```
         */
        function deleteUser(users, index, organization) {

            var deletedUser = users[index];

            if(me.id == deletedUser.id) {
                logger.warning('You can\'t delete yourself =)', '', 'Ooops!');
            } else {
                Trello.rest('DELETE', 'organizations/' + organization + '/members/' + users[index].id,
                    {},
                    function (res) {
                        logger.success('User ' + deletedUser.fullName +  ' deleted');
                        getUsers(users, organization);
                    },
                    function (err) {
                        logger.error('', err, err.responseText);
                    });
            }

            return deletedUser;
        }

        var me = me || {};

        getMe();

        /**
         * Sets local `me` to current user From Trello
         * @memberOf teamMembersFactory;
         */
        function getMe() {
            Trello.rest('GET', 'members/me',
                {

                }, function(res) {

                    logger.info('', res, 'Hello ' + res.fullName);

                    me = res;
                }, function(err) {
                    logger.error('Error in getMe()', err, err.responseText);
                });
        }

        return result;
    }
})();
