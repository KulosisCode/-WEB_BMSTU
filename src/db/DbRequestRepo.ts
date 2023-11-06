import { Pool } from "pg";
import { IRequestRepo } from "./interfaceDB/IRequestRepo";
import { Request} from "../model/Request";
import { ConnParams } from "./ConnParams";
import { REQUESTS_TABLE, build_connect, performDelete, performInsert, performQuery, performUpdate,  coerceDate } from "./common";
import { validateRequest } from "./dbCheck/validRequest";
import { DTORequest } from "../server/models";

export class DbRequestRepo implements IRequestRepo {
    conn: Pool;
    constructor(connParams: ConnParams)
    {
        this.conn = build_connect(connParams);
    }

    async addRequest(request: Request): Promise<boolean> {
        const { ok, errors} = validateRequest(request);
        if (!ok) {
            return false;
        }
        const timeIn = request.timein.toISOString();
        const timeOut = request.timeout.toISOString();
        const query = `INSERT INTO ${REQUESTS_TABLE} (id_guest, id_room, price, timeIn, timeOut, status) VALUES \
        (${request.id_guest}, ${request.id_room}, ${request.price}, '${timeIn}', '${timeOut}', ${request.status});`;

        await performInsert(query, this.conn);
        return true;
    }

    async getRequest(id: number): Promise<Request | null> {
        const query = `SELECT * FROM ${REQUESTS_TABLE} WHERE id = ${id};`
        const qres = await performQuery(query, this.conn);    
        return  qres && qres.rowCount
                ? (new Request(qres.rows[0].id, qres.rows[0].id_guest, qres.rows[0].id_room, 
                    qres.rows[0].price, coerceDate(qres.rows[0].timein), coerceDate(qres.rows[0].timeout), qres.rows[0].status)) 
                : null;
    }


    async updateRequest(id: number, status: number) {
        const query = `UPDATE ${REQUESTS_TABLE} SET status = ${status} \
        WHERE id = ${id}`;
        await performUpdate(query, this.conn);
        return true;
    }

    async removeRequest(id: number) {
        const query = `DELETE FROM ${REQUESTS_TABLE} WHERE id = ${id};`;
        await performDelete(query, this.conn);
        return true;
    }

    async getRequests(): Promise<Request[] | null> {
        const query = `SELECT * FROM ${REQUESTS_TABLE};`;
        const res = await performQuery(query, this.conn);
        if (!res)
            return null;
        return res.rows.map(p => (new DTORequest(p)).toRequest());
    }
}