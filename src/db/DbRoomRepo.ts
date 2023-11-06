import { Pool } from "pg";
import { IRoomRepo } from "./interfaceDB/IRoomRepo";
import { Room } from "../model/Room";
import { ConnParams } from "./ConnParams";
import { ROOMS_TABLE, build_connect, performDelete, performUpdate, performInsert,performQuery } from "./common";
import { validateRoom } from "./dbCheck/validRoom";
import { DTORoom } from "../server/models";


export class DbRoomRepo implements IRoomRepo {
    conn: Pool;
    constructor(connParams: ConnParams){
        this.conn = build_connect(connParams);
    }

    async addRoom(room: Room): Promise<boolean> {
        const { ok, errors} = validateRoom(room);
        // console.log(errors);
        if (!ok) {
            return false;
        }
        const q = `SELECT * FROM ${ROOMS_TABLE} WHERE number = ${room.number};`;
        const qres = await performQuery(q, this.conn);
        if (qres && qres.rowCount !== 0)
        {
            return false;
        }

        const query = `INSERT INTO ${ROOMS_TABLE} (number, priceperday, status) VALUES \
                (${room.number}, ${room.priceperday}, ${room.status});`;

        await performInsert(query, this.conn);
        return true;

    }

    async getRoom(id: number): Promise<Room | null> {
        const query = `SELECT * FROM ${ROOMS_TABLE} WHERE id = ${id};`
        const qres = await performQuery(query, this.conn);    
        return  qres && qres.rowCount
                ? (new Room(qres.rows[0].id, qres.rows[0].number, qres.rows[0].priceperday, qres.rows[0].status)) 
                : null;
    }

    async getRoomByNum(number: number): Promise<Room | null> {
        const query = `SELECT * FROM ${ROOMS_TABLE} WHERE number = ${number};`
        const qres = await performQuery(query, this.conn);    
        return  qres && qres.rowCount
                ? (new Room(qres.rows[0].id, qres.rows[0].number, qres.rows[0].priceperday, qres.rows[0].status)) 
                : null;
    }

    async updateRoom(id: number, priceperday: number, status: number) {
        const query = `UPDATE ${ROOMS_TABLE} SET priceperday = ${priceperday}, \
        status =  ${status} WHERE id = ${id}`;
        await performUpdate(query, this.conn);
        return true;
    }

    async removeRoom(id: number) {
        const query = `DELETE FROM ${ROOMS_TABLE} WHERE id = ${id};`;
        await performDelete(query, this.conn);
        return true;
    }

    async getRooms(): Promise<Room[] | null> {
        const query = `SELECT * FROM ${ROOMS_TABLE};`;
        const res = await performQuery(query, this.conn);
        if (!res)
            return null;
        return res.rows.map(p => (new DTORoom(p)).toRoom());
    }
}