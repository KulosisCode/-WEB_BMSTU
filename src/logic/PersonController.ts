import { IPersonRepo } from "../db/interfaceDB/IPersonRepo";
import { Person } from "../model/Person";

export class PersonController {
    personRepo: IPersonRepo;
    constructor(personRepo: IPersonRepo) {
        this.personRepo = personRepo;
    }

    async addPerson(person: Person) {
        return await this.personRepo.addPerson(person);
    }

    async getPerson(id: number) {
        return await this.personRepo.getPerson(id);
    }

    async updatePerson(id: number, name: string, age: number, email: string, address: string) {
        return await this.personRepo.updatePerson(id, name, age, email, address);
    }

    async removePerson(id: number) {
        return await this.personRepo.removePerson(id);
    }

    async getIdPersonByIdLogin(id_login: number) {
        return await this.personRepo.getIdPersonByIdLogin(id_login);
    }

    async getPersons() {
        return await this.personRepo.getPersons();
    }
}