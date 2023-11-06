import {Request, Response, NextFunction} from "express"
import { DTOHistory } from "../models"
import { safetyWrapper } from "../common";
import { DbError, NotFoundError, InvalidArgumentError } from "../../logic/error";
import { historyController } from "../initConnect";

export const createHistory= (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const history = (new DTOHistory(req.body)).toHistory();
        const status = await historyController.addHistory(history);
        if (!status)
            throw new DbError("Add failed!");
        res.status(200).json("History successfully added");
    });
}

export const getHistory= (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const id = req.params.id && parseInt(req.params.id);
        if (!id)
            throw new InvalidArgumentError("id not found!!!");
        const history = await historyController.getHistory(id);
        if (!history)
            throw new NotFoundError("history not found by id!");
        res.status(200).json(new DTOHistory(history));
    });
}

export const removeHistory= (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const id = req.params.id && parseInt(req.params.id);
        if (!id)
            throw new InvalidArgumentError("id not found");
        await historyController.removeHistory(id);
        res.status(200).json("Remove Success");
    });
}

export const getHistories = (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const historys = await historyController.getHistories();
        res.status(200).json(historys);
    });
}