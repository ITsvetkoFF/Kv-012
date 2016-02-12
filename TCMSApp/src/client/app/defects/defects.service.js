(function () {
    'use strict';

    angular
        .module('app.defects')
        .factory('DefectsService', DefectsService);

    DefectsService.$inject = ['$resource', 'apiUrl', 'logger', '$q'];

    function DefectsService($resource, apiUrl, logger, $q) {

        return {
            getTeamMembers: getTeamMembers
        };

        function getTeamMembers(projectID) {
            var defered = $q.defer(),
                membersList = [],
                IDs = [],
                resource = $resource(apiUrl.projects + '/' + projectID);

            resource.get().$promise
                .then(
                    function (res) {
                        IDs = getMembersIDs(res);
                        IDs.forEach(function (current) {
                            $resource('/api/v1/Users/' + current).get().$promise
                                .then(
                                    function (res) {
                                        var member = {
                                            fullName: res.fullName,
                                            _id: res._id
                                        };
                                        membersList.push(member);
                                    },
                                    function (err) {
                                        logger.error(err);
                                    })
                                .then(function () {
                                    defered.resolve(membersList);
                                });
                        });
                    },
                    function (err) {
                        logger.error(err);
                    });

            return defered.promise;

        }

        function getMembersIDs(project) {
            var IDList = [];
            project.admins.forEach(function (c) {
                IDList.push(c);
            });
            project.users.forEach(function (c) {
                IDList.push(c);
            });
            return IDList;
        }
    }
})();
