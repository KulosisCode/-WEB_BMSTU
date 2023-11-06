import { Pool } from "pg";
import { IUserRepo } from "./interfaceDB/IUserRepo";
import { User } from "../model/User";
import { DbError } from "../logic/error";
import { ConnParams } from "./ConnParams";
import { USERS_TABLE, build_connect, performDelete, performInsert, performQuery, performUpdate } from "./common";
import { validateUser } from "./dbCheck/validUser";

export class DbUserRepo implements IUserRepo {
    conn: Pool;
    constructor(connParams: ConnParams)
    {
        this.conn = build_connect(connParams);
    }

    async userExists(login: string): Promise<boolean> {
        const query = `SELECT * FROM ${USERS_TABLE} WHERE login = '${login}';`;
        const queryRes = await performQuery(query, this.conn);
        if (queryRes && queryRes.rowCount=== 0) {
            return false;
        }
        return true;
    }

    async addUser(user: User): Promise<boolean> {
        const { ok, errors } = validateUser(user);
        // console.log(errors);
        if (!ok) {
            return false;
        }
        const isExists = await this.userExists(user.login);
        
        if (isExists) {
            return false;
        }

        const query = `INSERT INTO ${USERS_TABLE} (login, password, role) VALUES \
                        ('${user.login}', '${user.password}', ${user.role});`; 

        await performInsert(query, this.conn);
        return true;
    }

    async getUserByLogin(login: string): Promise<User | null> {
        const query = `SELECT * FROM ${USERS_TABLE} WHERE login = '${login}';`
        const qres = await performQuery(query, this.conn);    
        return  qres && qres.rowCount
                ? (new User(qres.rows[0].id, qres.rows[0].login, qres.rows[0].password, qres.rows[0].role)) 
                : null;
    }

    async getUserById(id: number): Promise<User | null> {
        const query = `SELECT * FROM ${USERS_TABLE} WHERE id= ${id};`
        const qres = await performQuery(query, this.conn);    
        return  qres && qres.rowCount 
                ? (new User(qres.rows[0].id, qres.rows[0].login, qres.rows[0].password, qres.rows[0].role)) 
                : null;
    }

    async updateUser(id: number, password: string) {
        const query = `UPDATE ${USERS_TABLE} SET password = '${password}' \
        WHERE id = ${id}`;
        await performUpdate(query, this.conn);
        return true;
    }

    async removeUser(login: string) {
        const query = `DELETE FROM ${USERS_TABLE} WHERE login = '${login}';`;
        await performDelete(query, this.conn);
        return true;
    }
}