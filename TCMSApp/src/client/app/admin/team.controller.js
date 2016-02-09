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
        'createProjectFactory', 'authservice', 'user'];

    function TeamController(logger, TrelloTeamFactory, $scope, $rootScope, $q, createProjectFactory, authservice,
                            user) {
        var vmTeam = this;
        vmTeam.users = [];
        vmTeam.organization = '';

        vmTeam.addUser = addUser;
        vmTeam.getUsers = TrelloTeamFactory.getUsers;
        vmTeam.deleteUser = TrelloTeamFactory.deleteUser;

        activate();

        /**
         * Info about activating the view
         * @memberOf teamController
         */
        function activate() {
            logger.info('Activated Team view', '', 'Team Info');
            TrelloTeamFactory.getUsers(vmTeam.users);
            setDefaultInput();
        }

        /**
         * `PUT` user to project organization in Trello
         * @memberOf teamController
         */
        function addUser(isValidForm) {
            if (isValidForm) {
                TrelloTeamFactory.addUser({
                    newName: vmTeam.newName,
                    newEmail: vmTeam.newEmail,
                    newRole: vmTeam.newRole
                }).then(function (res) {
                    TrelloTeamFactory.getUsers(vmTeam.users);
                }, function (err) {
                    logger.error(err.responseText);
                });

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
