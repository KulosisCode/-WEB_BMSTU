export class Person {
    id: number;
    id_login: number;
    name: string;
    age: number;
    email: string;
    address: string;
    constructor(id: number, id_login: number, name: string, age: number,
                 email: string, address: string)
    {
        this.id = id;
        this.id_login = id_login;
        this.name = name;
        this.age = age;
        this.email = email;
        this.address = address;
    }
}