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

    TeamController.$inject = ['logger', 'TeamMembersFactory'];

    function TeamController(logger, TeamMembersFactory) {
        var vmTeam = this;
        vmTeam.users = [];
        vmTeam.organization = "test04498212";

        vmTeam.getUsers = TeamMembersFactory.getUsers;
        vmTeam.addUser = addUser;
        vmTeam.deleteUser = TeamMembersFactory.deleteUser;


        activate();
        setDefaultInput();
        TeamMembersFactory.auth();
        TeamMembersFactory.getUsers(vmTeam.users, vmTeam.organization);

        /**
         * Info about activating the view
         * @memberOf teamController
         */
        function activate() {
            logger.info('Activated Team view', '', 'Team Info');
        }

        /**
         * `PUT` user to project organization in Trello
         * @memberOF teamController
         */
        function addUser() {
            TeamMembersFactory.addUser({
                newName: vmTeam.newName,
                newEmail: vmTeam.newEmail,
                newRole: vmTeam.newRole
            }, vmTeam.users, vmTeam.organization);

            setDefaultInput();
        }

        /**
         * Set default input values into `Add user` form
         * @memberOF teamController
         */
        function setDefaultInput() {
            vmTeam.memberFilter = '';
            vmTeam.newName = '';
            vmTeam.newEmail = '';
            vmTeam.newRole = 'normal';
        }
    }
})();
