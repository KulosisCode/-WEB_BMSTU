import { NotFoundError, PermissionError, InvalidArgumentError, DbError, LogicError } from "../logic/error";

export const safetyWrapper = (res: any, f: any) => {
    f().catch((e: any) => {
        if (e instanceof NotFoundError)
            res.status(404).send(e.msg);
        else if (e instanceof PermissionError)
            res.status(403).send(e.msg);
        else if (e instanceof InvalidArgumentError)
            res.status(405).send(e.msg);
        else if (e instanceof LogicError)
            res.status(400).send(e.msg);
        else if (e instanceof DbError)
            res.status(500).send(e.msg);
        else {
            console.log(e);
            res.status(418).send(e.msg);
        }
    })
}
