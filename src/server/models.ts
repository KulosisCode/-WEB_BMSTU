import { Room } from "../model/Room";
import { User } from "../model/User";
import { Person } from "../model/Person";
import { Request } from "../model/Request";
import { History } from "../model/History";

export const correctDate = (date: Date) => {
    if (typeof (date) === "string")
      date = new Date(date);
  
    if (date.getTimezoneOffset() !== 0)
      date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
  
    return date;
}

export class DTOUser {
    id: number;
    login: string;
    password: string;
    role: number;
    constructor(obj: any) {
        this.id = obj.id;
        this.login = obj.login;
        this.password = obj.password;
        this.role = obj.role;
    }

    toUser() {
        return new User(this.id, this.login, this.password, this.role);
    }
};

export class DTOUserLoginInfo {
    login: string;
    password: string;
    constructor(obj: any) {
        this.login = obj.login;
        this.password = obj.password;
    }
};

export class DTORoom {
    id: number;
    number: number;
    priceperday: number;
    status: number;
    constructor(obj: any) {
        this.id = obj.id;
        this.number = obj.number;
        this.priceperday = obj.priceperday;
        this.status = obj.status;
    }

    toRoom() {
        return new Room(this.id, this.number, this.priceperday, this.status);
    }
}

export class DTOPerson {
    id: number;
    id_login: number;
    name: string;
    age: number;
    email: string;
    address: string;
    constructor(obj:any) {
        this.id = obj.id;
        this.id_login = obj.id_login;
        this.name = obj.name;
        this.age = obj.age;
        this.email = obj.email;
        this.address = obj.address;
    }

    toPerson() {
        return new Person(this.id, this.id_login, this.name, this.age, this.email,
                            this.address);
    }
}

export class DTORequest {
    id: number;
    id_guest: number;
    id_room: number;
    timein: Date;
    timeout: Date;
    price: number;
    status: number;
    constructor(obj: any) {
        this.id = obj.id;
        this.id_guest = obj.id_guest;
        this.id_room = obj.id_room;
        this.price = obj.price
        this.timein = correctDate(obj.timein);
        this.timeout = correctDate(obj.timeout);
        this.status = obj.status;
    }

    toRequest() {
        return new Request(this.id, this.id_guest, this.id_room, this.price, 
                    this.timein, this.timeout,  this.status)
    }
}

export class DTOHistory {
    id: number;
    id_request: number;
    id_staff: number;
    timeadded: Date;
    constructor(obj: any) {
        this.id = obj.id;
        this.id_request = obj.id_request;
        this.id_staff = obj.id_staff;
        this.timeadded = correctDate(obj.timeadded);
    }

    toHistory() {
        return new History(this.id, this.id_request, this.id_staff, this.timeadded);
    }
}