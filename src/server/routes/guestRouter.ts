import express, { Router } from "express";
import { createGuest, getGuest, getIdGuestByIdLogin, updateGuest, removeGuest, getGuests } from "../controllers/guestControllers";
const guest_router: Router = express.Router();


/**
 * Create Guest
 * @route POST /guests
 * @group guests - Operations about guest
 * @param {Person.model} Person.body.required - Infomation a about guest
 * @operationId createGuest
 * @produces application/json
 * @consumes application/json
 * @returns {string} 200 - ok (token)
 * @returns {string} 403 - No enough rights
 * @returns {string} 405 - invalid input
 */
guest_router.post('/', createGuest);

/**
 * Get Id Guest by Id_login
 * @route GET /guests/id/{id_login}
 * @group guests - Operations about guest
 * @param {integer} id_login.path.required - id_login of guest
 * @operationId getIdGuestByIdLogin
 * @produces application/json
 * @consumes application/json
 * @returns {string} 200 - ok (token)
 * @returns {string} 404 - Id not found
 * @returns {string} 405 - invalid input
 */
guest_router.get('/id', getIdGuestByIdLogin);

/**
 * Get Guest
 * @route GET /guests/{id}
 * @group guests - Operations about guest
 * @param {integer} id.path.required - id of guest
 * @operationId getGuest
 * @produces application/json
 * @consumes application/json
 * @returns {string} 200 - ok (token)
 * @returns {string} 404 - Guest not found
 * @returns {string} 405 - invalid input
 */
guest_router.get('/:id', getGuest);


/**
 * Update Guest
 * @route PATCH /guests
 * @group guests - Operations about guest
 * @param {integer} id.body.required - id of guest
 * @param {string} name.body.required - new name
 * @param {integer} age.body.required - new price
 * @param {string} email.body.required - new email
 * @param {string} address.body.required - new address
 * @operationId updateGuest
 * @produces text/plain
 * @consumes text/plain
 * @returns {string} 200 - ok
 * @returns {string} 403 - no enough rights
 * @returns {string} 405 - invalid input
 */
guest_router.patch('/', updateGuest);

/**
 * DELTE Guest
 * @route DELETE /guests
 * @group guests - Operations about guest
 * @param {integer} id.path.required - id of guest
 * @operationId removeGuest
 * @produces text/plain
 * @consumes text/plain
 * @returns {string} 200 - Ok
 * @returns {string} 403 - No enough rights
 * @returns {string} 404 - Room not found
 * @returns {string} 405 - Invalid input
 */
guest_router.delete('/:id', removeGuest);

/**
 * Get all Guests collection
 * @route GET /guests
 * @group guests - Operations about guest
 * @operationId getGuests
 * @produces application/json
 * @returns {Array.<Person.model>} 200 - An array of guests info
 */
guest_router.get('/', getGuests);


export default guest_router;
