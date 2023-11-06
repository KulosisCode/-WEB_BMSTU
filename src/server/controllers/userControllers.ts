import {Request, Response, NextFunction} from "express"
import { DTOUser, DTOUserLoginInfo } from "../models";
import { safetyWrapper } from "../common";
import { DbError, NotFoundError, InvalidArgumentError } from "../../logic/error";
import { authController, userController } from "../initConnect";


export const login = (req: Request, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async () => {
    const {login, password} = new DTOUserLoginInfo(req.body);
    const token = await authController.login(login, password);
    res.status(200).json(token);
  });
}

export const logout = (req: Request, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async() => {
    await authController.logout();
    await authController.resetHeader(res);
    res.status(200).send("OK");
  });
}

export const createUser = (req: Request, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async() => {
    const user = (new DTOUser(req.body)).toUser();
    const status = await userController.addUser(user);
    if (!status)
      throw new DbError("Add failed!");

    const temp_user = userController.getUserByLogin(user.login);
    if (!temp_user)
      throw new NotFoundError("Unnable to fetch newly added user!");

    const token = authController.generateToken(user);
    res.status(200).json(token);
  });
}

export const getUserByLogin = (req: Request, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async() => {
    const login = req.params.login;
    if (!login)
      throw new InvalidArgumentError("username not found!!!");
    const user = await userController.getUserByLogin(login);
    if (!user)
        throw new NotFoundError("user not found by username!");
    res.status(200).json(new DTOUser(user));
  });
}

export const getUserById = (req: Request, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async() => {
    const id = req.params.id && parseInt(req.params.id)
    if (!id)
        throw new InvalidArgumentError("id not found");
    const user = await userController.getUserById(id);
    if (!user)
        throw new NotFoundError("user not found by id");
    res.status(200).json(new DTOUser(user));
  });
}

export const updateUser = (req: Request, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async() => {
    const id = req.body.id && parseInt(req.body.id);
    const password = req.body.password;
    if (!id || !password)
      throw new InvalidArgumentError("Update failed!");
    await userController.updateUser(id, password);
    res.status(200).json("Update Success");
  })
}

export const removeUser = (req: Request, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async() => {
    const login = req.params.login;
    if (!login)
      throw new InvalidArgumentError("id not found");
    await userController.removeUser(login);
    res.status(200).json("Remove Success");
  })
}

