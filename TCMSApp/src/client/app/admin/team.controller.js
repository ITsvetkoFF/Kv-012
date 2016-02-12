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
        'createProjectFactory', 'authservice', 'user', '$resource', 'apiUrl'];

    function TeamController(logger, TrelloTeamFactory, $scope, $rootScope, $q, createProjectFactory, authservice,
                            user, $resource, apiUrl) {
        var vmTeam = this;
        vmTeam.users = [];
        vmTeam.organization = '';

        vmTeam.addUser = addUser;
        vmTeam.getUsers = TrelloTeamFactory.getUsers;
        vmTeam.deleteUser = TrelloTeamFactory.deleteUser;

        vmTeam.memberFilter = '';
        vmTeam.newName = '';
        vmTeam.newEmail = '';
        vmTeam.newRole = 'normal';
        vmTeam.newPass = '';

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
                var tempName = vmTeam.newName;
                TrelloTeamFactory.addUser({
                    newName: vmTeam.newName,
                    newEmail:vmTeam.newEmail,
                    newRole: vmTeam.newRole,
                    newPass: vmTeam.newPass
                }).then(function (res) {
                    TrelloTeamFactory.getUsers(vmTeam.users);

                    var currentUser;
                    for (var i = 0; i < res.members.length; i++) {
                        if (res.members[i].fullName === tempName) {
                            currentUser = res.members[i];
                            break;
                        }
                    }
                    //var usersInfo = $resource('/register/local', {}, {});
                    var usersInfo = $resource(apiUrl.users, {}, {});
                    var result = usersInfo.save(currentUser).$promise.then(function success() {
                    }, function error(message) {
                        var error;
                        if (message.data.errors.name !== undefined) {
                            error = message.data.errors.name.message;
                        }
                        else
                        {
                            error = 'Undefined error';
                        }
                    });
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
            vmTeam.newPass = '';
        }
    }
})();
