import { Person } from '../../model/Person';
export interface IPersonRepo {
    addPerson(Person: Person): Promise<Boolean>;
    getPerson(id: number): Promise<Person | null>;
    updatePerson(id: number, name: string, age: number, email: string, address: string): any;
    removePerson(id: number): any;
    getIdPersonByIdLogin(id_login: number): Promise<number | null>;
    getPersons(): Promise<Person[] | null>;
}