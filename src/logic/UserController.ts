import { IUserRepo } from "../db/interfaceDB/IUserRepo";
import { User } from "../model/User";

export class UserController {
    UserRepo: IUserRepo;
    constructor(UserRepo: IUserRepo) {
        this.UserRepo = UserRepo;
    }
    
    async addUser(user: User) {
        return await this.UserRepo.addUser(user);
    }

    async userExists(login: string) {
        return await this.UserRepo.userExists(login);
    }

    async getUserByLogin(login: string) {
        return await this.UserRepo.getUserByLogin(login);
    }

    async getUserById(id: number) {
        return await this.UserRepo.getUserById(id);
    }
    
    async removeUser(login: string) {
        return await this.UserRepo.removeUser(login);
    }

    async updateUser(id:number, password: string) {
        return await this.UserRepo.updateUser(id, password);
    }
}