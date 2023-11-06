import express, { Router } from "express";
import user_router from "./userRouter";
import room_router from "./roomRouter";
import guest_router from "./guestRouter";
import staff_router from "./staffRouter";
import request_router from "./requestRouter";
import history_router from "./historyRouter";

const api_router: Router = express.Router();

api_router.use("/users", user_router);
api_router.use("/rooms", room_router);
api_router.use("/guests", guest_router);

api_router.use("/staffs", staff_router);

api_router.use("/requests", request_router);

api_router.use("/histories", history_router);

export default api_router;