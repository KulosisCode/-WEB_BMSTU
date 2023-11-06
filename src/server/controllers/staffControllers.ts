import {Request, Response, NextFunction} from "express"
import { DTOPerson } from "../models"
import { safetyWrapper } from "../common";
import { DbError, NotFoundError, InvalidArgumentError } from "../../logic/error";
import { staffController } from "../initConnect";

export const createStaff = (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const staff = (new DTOPerson(req.body)).toPerson();
        const status = await staffController.addPerson(staff);
        if (!status)
            throw new DbError("Add failed!");
        res.status(200).json("Staff successfully added");
    });
}

export const getStaff = (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const id = req.params.id && parseInt(req.params.id);
        if (!id)
            throw new InvalidArgumentError("id not found!!!");
        const staff = await staffController.getPerson(id);
        if (!staff)
            throw new NotFoundError("staff not found by id!");
        res.status(200).json(new DTOPerson(staff));

    });
}

export const getIdStaffByIdLogin = (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const id_login = req.params.id_login && parseInt(req.params.id_login);
        if (!id_login)
            throw new InvalidArgumentError("id_login not found!!!");
        const id = await staffController.getIdPersonByIdLogin(id_login);
        if (!id)
            throw new NotFoundError("staff not found by id_login!");
        res.status(200).json(id);
    });
}

export const updateStaff = (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const id = req.body.id && parseInt(req.body.id);
        const name = req.body.name;
        const age = req.body.age && parseInt(req.body.age);
        const email = req.body.email;
        const address = req.body.address;
        if (!id || !name || !age || !email || !address)
            throw new InvalidArgumentError("Update failed!");
        await staffController.updatePerson(id, name, age, email, address);
        res.status(200).json("Update Success");
    });
}

export const removeStaff = (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const id = req.params.id && parseInt(req.params.id);
        if (!id)
            throw new InvalidArgumentError("id not found");
        await staffController.removePerson(id);
        res.status(200).json("Remove Success");
    });
}

export const getStaffs = (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const staffs = await staffController.getPersons();
        res.status(200).json(staffs);
    });
}