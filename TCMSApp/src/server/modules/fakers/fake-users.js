var faker = require('faker');
var bcrypt = require('bcrypt-nodejs');

function getFakeUsers(quantity) {
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

    var users = [];

    quantity = quantity || 1;
    quantity = (quantity < 1) ? 1 : quantity;

    for (var i = 0; i < quantity; i++) {
        var email = faker.internet.email();

        users[i] = {
            'fullName': faker.name.firstName() + ' ' + faker.name.lastName(),
            'email': email,
            'avatar': faker.image.avatar(),
            'password': bcrypt.hashSync(email, bcrypt.genSaltSync(10), null),
            'projects': []
        };
    }

    return users;
}

module.exports = getFakeUsers;

