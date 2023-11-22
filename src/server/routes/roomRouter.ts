import express, { Router } from "express";
import { createRoom, getRoom, updateRoom, removeRoom, getRoomByNum } from '../controllers/roomControllers';
const room_router: Router = express.Router();


/**
 * Create Room
 * @route POST /rooms
 * @group rooms - Operations about room
 * @param {Room.model} Room.body.required - Infomation a about room
 * @operationId createRoom
 * @produces application/json
 * @consumes application/json
 * @returns {string} 200 - ok (token)
 * @returns {string} 403 - No enough rights
 * @returns {string} 405 - invalid input
 */
room_router.post('/', createRoom);

/**
 * Get Room by Room Number
 * @route GET /rooms/num/{number}
 * @group rooms - Operations about room
 * @param {integer} number.path.required - id of room
 * @operationId getRoomByNum
 * @produces application/json
 * @consumes application/json
 * @returns {string} 200 - ok (token)
 * @returns {string} 404 - Room not found
 * @returns {string} 405 - invalid input
 */
room_router.get('/', getRoomByNum);

/**
 * Get Room
 * @route GET /rooms/id/{id}
 * @group rooms - Operations about room
 * @param {integer} id.path.required - id of room
 * @operationId loginUser
 * @produces application/json
 * @consumes application/json
 * @returns {string} 200 - ok (token)
 * @returns {string} 404 - Room not found
 * @returns {string} 405 - invalid input
 */
room_router.get('/:id', getRoom);

/**
 * Update Room
 * @route PATCH /rooms
 * @group rooms - Operations about user
 * @param {integer} id.body.required - id of room
 * @param {integer} price.body.required - new price
 * @param {integer} status.body.required - new status
 * @operationId updateRoom
 * @produces text/plain
 * @consumes text/plain
 * @returns {string} 200 - ok
 * @returns {string} 403 - no enough rights
 * @returns {string} 405 - invalid input
 */
room_router.patch('/', updateRoom);

/**
 * DELTE ROOM
 * @route DELETE /rooms
 * @group rooms - Operations about room
 * @param {integer} id.path.required - id of room
 * @operationId removeRoom
 * @produces text/plain
 * @consumes text/plain
 * @returns {string} 200 - Ok
 * @returns {string} 403 - No enough rights
 * @returns {string} 404 - Room not found
 * @returns {string} 405 - Invalid input
 */
room_router.delete('/:id', removeRoom);

/**
 * Get all Rooms collection
 * @route GET /rooms
 * @group rooms - Operations about room
 * @operationId getPlayers
 * @produces application/json
 * @returns {Array.<Room.model>} 200 - An array of rooms info
 */
// room_router.get('/', getRooms);


export default room_router;
