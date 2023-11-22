import {Request, Response, NextFunction} from "express"
import { DTORoom } from "../models"
import { safetyWrapper } from "../common";
import { DbError, NotFoundError, InvalidArgumentError } from "../../logic/error";
import { roomController } from "../initConnect";

export const createRoom = (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const room = (new DTORoom(req.body)).toRoom();
        const status = await roomController.addRoom(room);
        if (!status)
            throw new DbError("Add failed!");
        res.status(200).json("Room successfully added");
    });
}

export const getRoom = (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const id = req.params.id && parseInt(req.params.id);
        if (!id)
            throw new InvalidArgumentError("invalid Id !!!");
        const room = await roomController.getRoom(id);
        if (!room)
            throw new NotFoundError("room not found by id!");
        res.status(200).json(new DTORoom(room));

    });
}

export const getRoomByNum = (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const {number} = req.query;
        if (!number)
        {
            const rooms = await roomController.getRooms();
            res.status(200).json(rooms)
            // throw new InvalidArgumentError("number not found!!!");
        }
        else{

            const parseNum = Number(number);
            const room = await roomController.getRoomByNum(parseNum);
            if (!room)
                throw new NotFoundError("room not found by number!");
            res.status(200).json([new DTORoom(room)]);
        }
    });
}

export const updateRoom = (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const id = req.body.id && parseInt(req.body.id);
        const priceperday = req.body.priceperday && parseInt(req.body.priceperday);
        const status = req.body.status && parseInt(req.body.status);
        if (!priceperday || !status)
            throw new InvalidArgumentError("Update failed!");
        await roomController.updateRoom(id, priceperday, status);
        res.status(200).json("Update Success");
    });
}

export const removeRoom = (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const id = req.params.id && parseInt(req.params.id);
        if (!id)
            throw new InvalidArgumentError("id not found");
        await roomController.removeRoom(id);
        res.status(200).json("Remove Success");
    });
}

// export const getRooms = (req: Request, res: Response, next: NextFunction) => {
//     safetyWrapper(res, async () => {
//         const rooms = await roomController.getRooms();
//         res.status(200).json(rooms);
//     });
// }