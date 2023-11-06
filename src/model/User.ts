export enum ROLE{
    ADMIN,
    STAFF,
    GUEST
}
export class User{
    id: number;
    login: string;
    password: string;
    role: ROLE;
    constructor(id: number, login: string, password: string, role: ROLE) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.role = role;
    }
};