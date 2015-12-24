/**
 * @ngdoc controller
 * @name teamController
 * @memberOf app.admin
 * @description
 *  Control Manage Team template. Add, delete, edit users in the current project. Synchronize with Trello
 */

(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('TeamController', TeamController);

    TeamController.$inject = ['logger', 'Trello', 'TeamMembersFactory'];

    function TeamController(logger, Trello, TeamMembersFactory) {
        var teamVm = this;
        teamVm.users = [];
        teamVm.organization = "test04498212";

        teamVm.getUsers = TeamMembersFactory.getUsers;

        teamVm.addUser = addUser;
        teamVm.deleteUser = TeamMembersFactory.deleteUser;


        activate();
        setDefaultInput();
        TeamMembersFactory.auth();
        getMe();
        TeamMembersFactory.getUsers(teamVm.users, teamVm.organization);

        /**
         * Info about activating the view
         * @memberOf teamController
         */
        function activate() {
            logger.info('Activated Team view', '', 'Team Info');
        }

        /**
         * Set `teamVm.me` as current user from Trello
         * @memberOf teamController
         */
        function getMe() {

            Trello.rest('GET', 'members/me',
                {

                }, function(res) {
                    logger.info('', res, 'Hello ' + res.fullName);
                    teamVm.me = res;
                }, function(err) {
                    logger.error('Error in getMe()', err, err.responseText);
                });
        }

        /**
         * `PUT` user to project organization in Trello
         * @memberOF teamController
         */
        function addUser() {
            TeamMembersFactory.addUser({
                newName: teamVm.newName,
                newEmail: teamVm.newEmail,
                newRole: teamVm.newRole
            }, teamVm.users, teamVm.organization);

            setDefaultInput();
        }

        /**
         * Set default input values into `Add user` form
         * @memberOF teamController
         */
        function setDefaultInput() {
            teamVm.memberFilter = '';
            teamVm.newName = '';
            teamVm.newEmail = '';
            teamVm.newRole = 'normal';
        }
    }
})();
