import jwt from "jsonwebtoken"
import { Request, Response } from "express";
import { PermissionError, NotFoundError } from "./error";
import { IUserRepo } from "../db/interfaceDB/IUserRepo";
import { User } from "../model/User";

const SECRET_KEY = "SECRET_KEY";

export class AuthController {
    userRepo: IUserRepo;
    constructor (userRepo: IUserRepo) {
        
        this.userRepo = userRepo;
    }

    // encoding password
    async login(login: string, password: string) {
        const user = await this.userRepo.getUserByLogin(login);
        if (!user)
            throw new NotFoundError("User not exits in database!");
        if (user.password !== password)
            throw new PermissionError("Wrong Password!");
        return this.generateToken(user);
    }

    generateToken (user: User) {
        user.password = ''
        return "Kulosis" + jwt.sign({
            data: JSON.stringify(user)
        }, SECRET_KEY, { expiresIn: '1h'});
    }

    async verify(token: string) {
        try {
            jwt.verify(token, SECRET_KEY);
        } catch (ex) {
            throw new PermissionError("Failed to verify token");
        }
    }

    async extractToken (req: Request) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === "Kulosis")
            return req.headers.authorization.split(' ')[1];
        else if (req.cookies && req.cookies.jwtToken)
            return req.cookies.jwtToken;
        else if (req.params && req.params.token)
            throw new PermissionError("Credentials weren't provided");
    }

    async extractInfoFromToken(token: string) {
        const decoded: any = jwt.decode(token);
        return JSON.parse(decoded.data);
    }

    async logout(token?: any) {
    }

    async resetHeader(res: Response) {
        res.clearCookie("jwtToken");
    }
    
    // async setHeader(res: Response, token) {
    //     res.cookie("jwtToken", `${token}`);
    // }
}