import express, { Router } from "express";
import { createRequest, getRequest, updateRequest, removeRequest, getRequests } from "../controllers/requestControllers";
const request_router: Router = express.Router();



request_router.post('/', createRequest);

request_router.get('/:id', getRequest);

request_router.patch('/', updateRequest);

request_router.delete('/:id', removeRequest);

request_router.get('/', getRequests);

export default request_router;
