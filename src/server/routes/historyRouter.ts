import express, { Router } from "express";
import { createHistory, getHistory, removeHistory, getHistories } from "../controllers/historyControllers";
const history_router: Router = express.Router();



history_router.post('/', createHistory);

history_router.get('/:id', getHistory);

history_router.delete('/:id', removeHistory);

history_router.get('/', getHistories);
// module.exports = history_router;
export default history_router;
