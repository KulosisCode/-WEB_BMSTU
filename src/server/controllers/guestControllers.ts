import {Request, Response, NextFunction} from "express"
import { DTOPerson } from "../models"
import { safetyWrapper } from "../common";
import { DbError, NotFoundError, InvalidArgumentError } from "../../logic/error";
import { guestController } from "../initConnect";

export const createGuest = (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const guest = (new DTOPerson(req.body)).toPerson();
        const status = await guestController.addPerson(guest);
        if (!status)
            throw new DbError("Add failed!");
        res.status(200).json("Guest successfully added");
    });
}

export const getGuest = (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const id = req.params.id && parseInt(req.params.id);
        if (!id)
            throw new InvalidArgumentError("invalid id!!!");
        const guest = await guestController.getPerson(id);
        if (!guest)
            throw new NotFoundError("guest not found by id!");
        res.status(200).json(new DTOPerson(guest));

    });
}

export const getIdGuestByIdLogin = (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const id_login = req.query.id_login;
        if (!id_login)
            throw new InvalidArgumentError("id_login invalid!!!");
        const parseId_login = Number(id_login);
        const id = await guestController.getIdPersonByIdLogin(parseId_login);
        if (!id)
            throw new NotFoundError("guest not found by id_login!");
        console.log(id);
        res.status(200).json(id);
    });
}

export const updateGuest = (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const id = req.body.id && parseInt(req.body.id);
        const name = req.body.name;
        const age = req.body.age && parseInt(req.body.age);
        const email = req.body.email;
        const address = req.body.address;
        if (!id || !name || !age || !email || !address)
            throw new InvalidArgumentError("Update failed!");
        await guestController.updatePerson(id, name, age, email, address);
        res.status(200).json("Update Success");
    });
}

export const removeGuest = (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const id = req.params.id && parseInt(req.params.id);
        if (!id)
            throw new InvalidArgumentError("invalid id");
        await guestController.removePerson(id);
        res.status(200).json("Remove Success");
    });
}

export const getGuests = (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const guests = await guestController.getPersons();
        res.status(200).json(guests);
    });
}