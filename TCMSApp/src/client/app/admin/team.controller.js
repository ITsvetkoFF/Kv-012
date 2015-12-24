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
        var vm = this;
        vm.users = [];
        vm.organization = "test04498212";

        vm.getUsers = TeamMembersFactory.getUsers;

        vm.addUser = addUser;
        vm.deleteUser = TeamMembersFactory.deleteUser;


        activate();
        setDefaultInput();
        TeamMembersFactory.auth();
        getMe();
        TeamMembersFactory.getUsers(vm.users, vm.organization);

        /**
         * Info about activating the view
         * @memberOf teamController
         */
        function activate() {
            logger.info('Activated Team view', '', 'Team Info');
        }

        /**
         * Set `vm.me` as current user from Trello
         * @memberOf teamController
         */
        function getMe() {

            Trello.rest('GET', 'members/me',
                {

                }, function(res) {
                    logger.info('', res, 'Hello ' + res.fullName);
                    vm.me = res;
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
                newName: vm.newName,
                newEmail: vm.newEmail,
                newRole: vm.newRole
            }, vm.users, vm.organization);

            setDefaultInput();
        }

        /**
         * Set default input values into `Add user` form
         * @memberOF teamController
         */
        function setDefaultInput() {
            vm.memberFilter = '';
            vm.newName = '';
            vm.newEmail = '';
            vm.newRole = 'normal';
        }
    }
})();
