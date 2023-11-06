/**
 * @typedef UserLoginInfo
 * @property {string} login.required - user login
 * @property {string} password.required - user password
 */
/**
 * @typedef User
 * @property {integer} id - user id
 * @property {string} login.required - user login
 * @property {string} password.required - user password
 * @property {integer} role.required - user role level
 */

/**
 * @typedef Room
 * @property {integer} id - room id
 * @property {integer} number.required - room number
 * @property {integer} price.required - room price
 * @property {integer} status.required - room status
 */

/**
 * @typedef Person
 * @property {integer} id - person id
 * @property {integer} id_login - user id of person
 * @property {string} name - name of person
 * @property {integer} age - age of person
 * @property {string} email - email of person
 * @property {string} address - address of person
 */

/**
 * @typedef Request
 * @property {integer} id - request id
 * @property {integer} id_guest - guest id of request
 * @property {integer} id_room - room id of request
 * @property {Date} timein 
 * @property {Date} timeout
 * @property {interger} price - price of request
 * @property {integer} status - status of request
 */

/**
 * @typedef History
 * @property {integer} id - id of history record
 * @property {integer} id_request
 * @property {integer} id_staff
 * @property {Date} timeadded
 */