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

    TeamController.$inject = ['logger', 'TrelloTeamFactory', '$scope', '$rootScope', '$q',
                              'createProjectFactory', 'authservice'];

    function TeamController(logger, TrelloTeamFactory, $scope, $rootScope, $q, createProjectFactory, authservice) {
        var vmTeam = this;
        vmTeam.users = [];
        vmTeam.organization = '';

        vmTeam.addUser = addUser;
        vmTeam.getUsers = TrelloTeamFactory.getUsers;
        vmTeam.deleteUser = TrelloTeamFactory.deleteUser;

        vmTeam.Trello = authservice.authorize();

        activate();
        setDefaultInput();

        // not listening CurrentProjectChanged
        $scope.$on('CurrentProjectChanged', function() {

            vmTeam.organization = createProjectFactory.getCurrentProject().trello.name;

            vmTeam.getUsers(vmTeam.Trello, vmTeam.users, vmTeam.organization);
        });

        /**
         * Info about activating the view
         * @memberOf teamController
         */
        function activate() {
            logger.info('Activated Team view', '', 'Team Info');

            $q.when(
                TrelloTeamFactory.getMe(vmTeam.Trello)
            ).then(function() {
                    vmTeam.organization = createProjectFactory.getCurrentProject().trello.name;
                    vmTeam.getUsers(vmTeam.Trello, vmTeam.users, vmTeam.organization);
                });
        }

        /**
         * `PUT` user to project organization in Trello
         * @memberOf teamController
         */
        function addUser(isValidForm) {
            if (isValidForm) {
                TrelloTeamFactory.addUser(vmTeam.Trello, {
                    newName: vmTeam.newName,
                    newEmail: vmTeam.newEmail,
                    newRole: vmTeam.newRole
                }, vmTeam.users, vmTeam.organization);

                setDefaultInput();
            }
        }

        /**
         * Set default input values into `Add user` form
         * @memberOf teamController
         */
        function setDefaultInput() {
            vmTeam.memberFilter = '';
            vmTeam.newName = '';
            vmTeam.newEmail = '';
            vmTeam.newRole = 'normal';
        }
    }
})();
