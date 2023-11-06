import { Pool } from "pg";
import { BaseError, NotFoundError, PermissionError, DbError} from "../logic/error";
import { ConnParams } from "./ConnParams";
// Common Functions

export const USERS_TABLE = "users";
export const ROOMS_TABLE = "rooms";
export const GUESTS_TABLE = "guests";
export const STAFFS_TABLE = "staffs";
export const REQUESTS_TABLE = "requests";
export const HISTORIES_TABLE = "histories"; 

export const build_connect = (params: ConnParams) => {
    return new Pool(params);
}

export const performQuery = async (queryString: string, conn: Pool) => {
    try {
        return await conn.query(queryString);
    }
    catch (ex) {
        throw new DbError(`Failed to query postgres (reason: ${ex}, ${queryString})`)
    }
}

export const performInsert = async (queryString: string, conn: Pool) => {
    try {
        const res = await performQuery(queryString, conn);
        if (!res)
            throw new DbError("Failed to insert into db");
        if (res.rowCount == 0)
            throw new NotFoundError("Not found");
    } catch(e: any) {
        if (e instanceof BaseError)
            throw e;
        if (e.errno < 0)
            throw new DbError("Failed to connect to db");
        else
            throw new PermissionError(`Something went wrong (${e})`);
    }
}

export const performDelete = async (queryString: string, conn: Pool) => {
    try {
        const res = await performQuery(queryString, conn);
        if (!res)
            throw new DbError("Failed to delete from db");
        if (res.rowCount == 0)
            throw new NotFoundError("Not found");
    } catch(e: any) {
        if (e instanceof BaseError)
            throw e;
        if (e.errno < 0)
            throw new DbError("Failed to connect to db");
        else
            throw new PermissionError("Something went wrong");
    }
}

export const performUpdate = async (queryString: string, conn: Pool) => {
    try {
        const res = await performQuery(queryString, conn);
        if (!res)
            throw new DbError("Failed to update in db");
        if (res.rowCount == 0)
            throw new NotFoundError("Not found");
    } catch(e: any) {
        if (e instanceof BaseError)
            throw e;
        if (e.errno < 0)
            throw new DbError("Failed to connect to db");
        else
            throw new PermissionError("Something went wrong");
    }
}


export const coerceDate = (date: Date) => {
    date = new Date(date);
    if (date.getTimezoneOffset() !== 0)
      date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    return date;
  }