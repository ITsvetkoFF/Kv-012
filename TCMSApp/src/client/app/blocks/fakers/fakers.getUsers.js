/**
 * factory for module app.fakers
 */

!function() {
	'use strict';

	angular
			.module('app.fakers')
			.factory('getUsers', getUsers);

	/**
	 * Generates random users
	 *
	 * @requires "faker.js"
	 * @param {Number} quantity
	 * @returns {Array} an array of objects
	 * @example
	 * // returns [
	 * 				{
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
	 *			]
	 *
	 *	getUsers(1);
	 *
	 * P.S. first user has "role": "administrator", everyone else - "tester"
	 *
	 */

	function getUsers() {

		function createUsers (quantity) {
			var users = [];

			if (quantity > 0) {
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

			} else {
				return 'wrong input, quantity of users should be greater than zero';
			}

			return users;

		};

		return createUsers;
	};

}();



.ctrl(getUsers);

getUsers(10);

