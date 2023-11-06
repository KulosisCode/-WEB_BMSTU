import { Pool } from "pg";
import { IPersonRepo } from "./interfaceDB/IPersonRepo";
import { Person} from "../model/Person";
import { ConnParams } from "./ConnParams";
import { STAFFS_TABLE, build_connect, performDelete, performInsert, performQuery, performUpdate } from "./common";
import { validatePerson } from "./dbCheck/validPerson";
import { DTOPerson } from "../server/models";

export class DbStaffRepo implements IPersonRepo {
    conn: Pool;
    constructor(connParams: ConnParams)
    {
        this.conn = build_connect(connParams);
    }

    async addPerson(person: Person): Promise<boolean> {
        const { ok, errors} = validatePerson(person);
        // console.log(errors);
        if (!ok) {
            return false;
        }

        const query = `INSERT INTO ${STAFFS_TABLE} (id_login, name, age, email, address) VALUES \
        (${person.id_login}, '${person.name}', ${person.age}, '${person.email}', '${person.address}');`;

        await performInsert(query, this.conn);
        return true;
    }

    async getPerson(id: number): Promise<Person | null> {
        const query = `SELECT * FROM ${STAFFS_TABLE} WHERE id = ${id};`
        const qres = await performQuery(query, this.conn);    
        return  qres && qres.rowCount
                ? (new Person(qres.rows[0].id, qres.rows[0].id_login, qres.rows[0].name, qres.rows[0].age, qres.rows[0].email, qres.rows[0].address)) 
                : null;
    }

    async getIdPersonByIdLogin(id_login: number): Promise<number | null> {
        const query = `SELECT id FROM ${STAFFS_TABLE} WHERE id_login = ${id_login};`
        const qres = await performQuery(query, this.conn);    
        return  qres && qres.rowCount 
                ? (qres.rows[0].id) 
                : null;
    }

    async updatePerson(id: number, name: string, age: number, email: string, address: string) {
        const query = `UPDATE ${STAFFS_TABLE} SET name = '${name}', \
        age = ${age}, email = '${email}', address = '${address}'  WHERE id = ${id}`;
        await performUpdate(query, this.conn);
        return true;
    }

    async removePerson(id: number) {
        const query = `DELETE FROM ${STAFFS_TABLE} WHERE id = ${id};`;
        await performDelete(query, this.conn);
        return true;
    }

    async getPersons(): Promise<Person[] | null> {
        const query = `SELECT * FROM ${STAFFS_TABLE};`;
        const res = await performQuery(query, this.conn);
        if (!res)
            return null;
        return res.rows.map(p => (new DTOPerson(p)).toPerson());
    }
}