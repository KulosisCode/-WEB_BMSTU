import { ConnParams } from '../db/ConnParams';
import { DbUserRepo } from "../db/DbUserRepo";
import { DbRoomRepo } from '../db/DbRoomRepo';
import { DbGuestRepo } from '../db/DbGuestRepo';
import { DbStaffRepo } from '../db/DbStaffRepo';
import { DbRequestRepo } from '../db/DbRequestRepo';
import { DbHistoryRepo } from '../db/DbHistoryRepo';

import { AuthController } from "../logic/AuthController";
import { UserController } from '../logic/UserController';
import { RoomController } from '../logic/RoomController';
import { PersonController } from '../logic/PersonController';
import { RequestController } from '../logic/RequestController';
import { HistoryController } from '../logic/HistoryController';

const USERNAME = "postgres";
const HOST = "localhost";
const DATABASE = "my_ppo";
const PASSWORD = "haoasd";
const PORT = 5432;

const connParams: ConnParams = {
    user: USERNAME,
    host: HOST,
    database: DATABASE,
    password: PASSWORD,
    port: PORT,
};

const userRepo = new DbUserRepo(connParams);
const roomRepo = new DbRoomRepo(connParams);
const guestRepo = new DbGuestRepo(connParams);
const staffRepo = new DbStaffRepo(connParams);
const requestRepo = new DbRequestRepo(connParams)
const historyRepo = new DbHistoryRepo(connParams)

export const userController = new UserController(userRepo);
export const authController = new AuthController(userRepo);
export const roomController = new RoomController(roomRepo);
export const guestController = new PersonController(guestRepo);
export const  staffController = new PersonController(staffRepo);
export const requestController = new RequestController(requestRepo);
export const historyController = new HistoryController(historyRepo);