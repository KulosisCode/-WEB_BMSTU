import { Pool } from "pg";
import { IHistoryRepo } from "./interfaceDB/IHistoryRepo";
import { History } from "../model/History";
import { ConnParams } from "./ConnParams";
import { HISTORIES_TABLE, build_connect, performDelete, performInsert, performQuery, performUpdate, coerceDate } from "./common";
import { validateHistory } from "./dbCheck/validHistory";
import { DTOHistory } from "../server/models";

export class DbHistoryRepo implements IHistoryRepo {
    conn: Pool;
    constructor(connParams: ConnParams)
    {
        this.conn = build_connect(connParams);
    }

    async addHistory(history: History): Promise<boolean> {
        const { ok, errors} = validateHistory(history);
        if (!ok) {
            return false;
        }
        const timeadded = history.timeadded.toISOString();
        const query = `INSERT INTO ${HISTORIES_TABLE} (id_request, id_staff, timeAdded) VALUES \
        (${history.id_request}, ${history.id_staff}, '${timeadded}');`;

        await performInsert(query, this.conn);
        return true;
    }

    async getHistory(id: number): Promise<History| null> {
        const query = `SELECT * FROM ${HISTORIES_TABLE} WHERE id = ${id};`
        const qres = await performQuery(query, this.conn);    
        return  qres && qres.rowCount
                ? (new History(qres.rows[0].id, qres.rows[0].id_request, qres.rows[0].id_staff, 
                    coerceDate(qres.rows[0].timeadded))) 
                : null;
    }

    async removeHistory(id: number) {
        const query = `DELETE FROM ${HISTORIES_TABLE} WHERE id = ${id};`;
        await performDelete(query, this.conn);
        return true;
    }

    async getHistories(){
        const query = `SELECT * FROM ${HISTORIES_TABLE};`;
        const res = await performQuery(query, this.conn);
        if (!res)
            return null;
        return res.rows.map(p => (new DTOHistory(p)).toHistory());
    }
}