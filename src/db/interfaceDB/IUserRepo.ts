import { User } from '../../model/User';
export interface IUserRepo {
    addUser(user: User): Promise<boolean>;
    getUserByLogin(login: string): Promise<User | null>;
    getUserById(id: number): Promise<User | null>;
    userExists(login: string): Promise<boolean>;
    updateUser(id: number, password: string): any;
    removeUser(login: string): any;
}