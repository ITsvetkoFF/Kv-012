/**
 * Factory description
 * @ngdoc factory
 * @name fakeUsersFactory
 * @memberOf app.fakers
 *  @example
 *  fakeUsersFactory(1);
 */

!function () {
    'use strict';


    angular
        .module('app.fakers')
        .factory('FakeUsersFactory', FakeUsersFactory);

    FakeUsersFactory.$inject = ['faker'];

    function FakeUsersFactory(faker) {
        /**
         * Generates random users
         *
         * ```
         * returns
         * [
         *               {
         * 				  "_id": 1,
         *				  "firstName": "Karelle",
         *				  "lastName": "Johns",
         *				  "username": "Wanda5",
         *				  "password": "9ufaenK5Yf_6X7D",
         *			   	  "email": "Mitchell_Emmerich@gmail.com",
         *				  "phone": "939-956-7839",
         *				  "skype": "Luciano_Kozey79",
         *				  "website": "jailyn.org",
         *				  "companyName": "Zemlak, Dickinson and Dickens",
         *				  "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/herbigt/128.jpg",
         *				  "role": "administrator"
         *				}
         *            ]
         * if variable quantity not implemented or less than 1 it will be equal 1
         *
         * first user has "role": "administrator", everyone else - "tester"
         * ```
         * @memberOf fakeUsersFactory
         * @requires "faker.js"
         * @param {Number} [quantity=1] description of data format
         * @returns {Array} an array of object(s)
         */
        function createUsers(quantity) {
            var users = [];
            quantity = quantity || 1;
            quantity = (quantity < 1) ? 1 : quantity;

            for (var i = 0; i < quantity; i++) {

                users[i] = {

                    "_id": i + 1,
                    "firstName": faker.name.firstName(),
                    "lastName": faker.name.lastName(),
                    "username": faker.internet.userName(),
                    "password": faker.internet.password(),
                    "email": faker.internet.email(),
                    "phone": faker.phone.phoneNumberFormat(),
                    "skype": faker.internet.userName(),
                    "website": faker.internet.domainName(),
                    "companyName": faker.company.companyName(),
                    "avatar": faker.image.avatar(),
                    "role": "tester"
                };
            }
            // first user will be always administrator
            users[0].role = "administrator";

            return users;

        };

        return createUsers;
    };



}();



