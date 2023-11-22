import {Request, Response, NextFunction} from "express"
import { DTORequest } from "../models"
import { safetyWrapper } from "../common";
import { DbError, NotFoundError, InvalidArgumentError } from "../../logic/error";
import { requestController } from "../initConnect";

export const createRequest= (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const request = (new DTORequest(req.body)).toRequest();
        const status = await requestController.addRequest(request);
        if (!status)
            throw new DbError("Add failed!");
        res.status(200).json("Request successfully added");
    });
}

export const getRequest= (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const id = req.params.id && parseInt(req.params.id);
        if (!id)
            throw new InvalidArgumentError("invalid id!!!");
        const request = await requestController.getRequest(id);
        if (!request)
            throw new NotFoundError("request not found by id!");
        res.status(200).json(new DTORequest(request));

    });
}


export const updateRequest= (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const id = req.body.id && parseInt(req.body.id);
        const status = req.body.status && parseInt(req.body.status);
        if (!id || !status)
            throw new InvalidArgumentError("Update failed!");
        await requestController.updateRequest(id,status);
        res.status(200).json("Update Success");
    });
}

export const removeRequest= (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const id = req.params.id && parseInt(req.params.id);
        if (!id)
            throw new InvalidArgumentError("invalid id");
        await requestController.removeRequest(id);
        res.status(200).json("Remove Success");
    });
}

export const getRequests = (req: Request, res: Response, next: NextFunction) => {
    safetyWrapper(res, async () => {
        const requests = await requestController.getRequests();
        res.status(200).json(requests);
    });
}