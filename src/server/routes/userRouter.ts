import express, { Router } from "express";
import { login, createUser , getUserByLogin, getUserById, updateUser, removeUser } from "../controllers/userControllers";
const user_router: Router = express.Router();


/**
 * Login into system
 * @route POST /users/login
 * @group users - Operations about user
 * @param {UserLoginInfo.model} loginInfo.body.required - user login info (login + password)
 * @operationId loginUser
 * @produces application/json
 * @consumes application/json
 * @returns {string} 200 - ok (token)
 * @returns {string} 404 - user not found
 * @returns {string} 405 - invalid input
 */
user_router.post('/login', login);

/**
 * Create new user
 * @route POST /users
 * @group users - Operations about user
 * @param {User.model} user.body.required - user info
 * @operationId createUser
 * @produces application/json
 * @consumes application/json
 * @returns {string} 200 - ok (token)
 * @returns {string} 405 - invalid input
 */
user_router.post('/', createUser);

/**
 * Get user by username(login)
 * @route GET /users/user/{login}
 * @group users - Operations about user
 * @param {string} login.path.required - username of user to get
 * @operationId getUserByLogin
 * @produces text/plain
 * @consumes application/json
 * @returns {string} 200 - ok
 * @returns {string} 404 - user not found
 * @returns {string} 405 - invalid input
 */
user_router.get("/username/:login", getUserByLogin);

/**
 * Get user by id
 * @route GET /users/id/{id}
 * @group users - Operations about user
 * @param {interger} id.path.required - id of user to get
 * @operationId getUserById
 * @produces text/plain
 * @consumes application/json
 * @returns {string} 200 - ok
 * @returns {string} 404 - user not found
 * @returns {string} 405 - invalid input
 */
user_router.get('/id/:id', getUserById);

/**
 * Update user password
 * @route PATCH /users
 * @group users - Operations about user
 * @param {string} password.body.required - new password
 * @operationId updateUser
 * @produces text/plain
 * @consumes text/plain
 * @returns {string} 200 - ok
 * @returns {string} 403 - Unauthorized
 * @returns {string} 405 - invalid input
 * @security JWT
 */
user_router.patch('/', updateUser);

/**
 * Delete user password
 * @route DELETE /users
 * @group users/{login} - Operations about user
 * @param {string} login.path.required - new password
 * @operationId updateUser
 * @produces text/plain
 * @consumes text/plain
 * @returns {string} 200 - Ok
 * @returns {string} 403 - No enough rights
 * @returns {string} 404 - User not found
 * @returns {string} 405 - Invalid input
 * @security JWT
 */
user_router.delete('/:login', removeUser);
// module.exports = user_router;
export default user_router;
