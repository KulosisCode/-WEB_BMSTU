import express, { Router } from "express";
import { createStaff, getStaff, getIdStaffByIdLogin, updateStaff, removeStaff, getStaffs } from "../controllers/staffControllers";
const staff_router: Router = express.Router();



staff_router.post('/', createStaff);

staff_router.get('/:id', getStaff);

staff_router.get("/id/:number", getIdStaffByIdLogin);

staff_router.patch('/', updateStaff);

staff_router.delete('/:id', removeStaff);

staff_router.get('/', getStaffs);
// module.exports = staff_router;
export default staff_router;
