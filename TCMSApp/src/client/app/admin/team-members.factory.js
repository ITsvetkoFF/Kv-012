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

        var result = {
            auth: auth,
            getUsers: getUsers,
            deleteUser: deleteUser,
            addUser: addUser,
        };

        auth();

        /**
         * Trello authorize
         * @memberOf teamMembersFactory;
         */
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
         * @param {Array.<User>} users
         * @param {String} organization name of the current project
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
         * @param {Object} newUser option object
         * @param {Array.<User>} users
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
         * Deletes users to Trello
         * @memberOf teamMembersFactory;
         * @param array
         * @param index
         * @param organization
         * @param me
         * @returns {*}
         */
        function deleteUser(array, index, organization, me) {

            var deletedUser = array[index];

            if(me.id == deletedUser.id) {
                logger.warning('You can\'t delete yourself =)', '', 'Ooops!');
            } else {
                Trello.rest('DELETE', 'organizations/' + organization + '/members/' + array[index].id,
                    {},
                    function (res) {
                        logger.success('User ' + deletedUser.fullName +  ' deleted');
                        getUsers(array, organization);
                    },
                    function (err) {
                        logger.error('', err, err.responseText);
                    });
            }

            return deletedUser;
        }

        return result;
    }
})();
