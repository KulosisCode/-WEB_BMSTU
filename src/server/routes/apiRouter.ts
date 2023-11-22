import express, { Router } from "express";
import user_router from "./userRouter";
import room_router from "./roomRouter";
import guest_router from "./guestRouter";
import staff_router from "./staffRouter";
import request_router from "./requestRouter";
import history_router from "./historyRouter";

const api_router: Router = express.Router();

api_router.use("/Users", user_router);
api_router.use("/Rooms", room_router);
api_router.use("/Guests", guest_router);

api_router.use("/Staffs", staff_router);

api_router.use("/Requests", request_router);

api_router.use("/Histories", history_router);

export default api_router;