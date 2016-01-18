(function() {
    'use strict';

    angular
        .module('app.trello')
        .factory('ManageTrelloProject', ManageTrelloProject);

    ManageTrelloProject.$inject = ['logger', 'Trello', 'user', '$q'];

    function ManageTrelloProject(logger, Trello, user, $q) {
        return {
            addBoard: addBoard
        };

        function addBoard(name) {
            var project = $q
                .when(user.getCurrentProject())
                .then(function(res) {
                    return res;
                });

            Trello.post('boards', {
                name: name,
                idOrganization: project.id
            }).then(function(res) {
                logger.success('The board ' + name + 'successfully added');
            }, function(err) {
                logger.error(err.responseText, '', 'Board have not posted');
            });
        }
    }
})();
