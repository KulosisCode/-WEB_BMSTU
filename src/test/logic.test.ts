import { UserController } from "../logic/UserController";
import { RoomController } from "../logic/RoomController";
import { PersonController } from "../logic/PersonController";
import { RequestController } from "../logic/RequestController";
import { HistoryController } from "../logic/HistoryController";

import { IUserRepo } from "../db/interfaceDB/IUserRepo";
import { IRoomRepo } from "../db/interfaceDB/IRoomRepo";
import { IPersonRepo } from "../db/interfaceDB/IPersonRepo";
import { IRequestRepo } from "../db/interfaceDB/IRequestRepo";
import { IHistoryRepo } from "../db/interfaceDB/IHistoryRepo";

import { User, ROLE } from "../model/User";
import { Room, STATUSROOM } from '../model/Room';
import { Person } from "../model/Person";
import { Request, STATUSREQ } from "../model/Request";
import { History } from "../model/History";
import { describe } from "node:test";

class FakeUserRepo implements IUserRepo {
    users : User[];

    constructor(users: User[]) {
        this.users = users;
    }
    async addUser(user: User) {
        this.users.push(user);
        return true;
    }
    async userExists(login: string){
        const users = this.users.filter((instance) => instance.login === login);
        return users.length ? true : false;
    }
    async getUserByLogin(login: string){
        const users = this.users.filter((instance) => instance.login === login);
        return users.length ? users[0] : null;
    }
    async getUserById(id: number) {
        const users = this.users.filter((instance) => instance.id === id);
        return users.length ? users[0] : null;
    }
    async updateUser(id: number, password: string) {
        const users = this.users.filter((instance) => instance.id === id);
        if (users.length) {
            users[0].password = password;
            return true;
        }
        return false;
    }
    async removeUser(login: string) {
        const idx: number = this.users.findIndex(x => x.login === login);
        if (idx > -1) {
            this.users.splice(idx, 1);
            return true;
        }
        return false;
    }
}

describe("Test UserController", () => {
    const users = [
        new User(1, "kulosis", "password", ROLE.GUEST),
        new User(2, "Matt", "password", ROLE.STAFF),
        new User(3, "Admin", "password", ROLE.ADMIN)
    ];

    const CONTROL = new UserController(new FakeUserRepo([]));
    
    it("Create user", async() => {
        for (let i = 0; i < users.length; i++) {
                const opres = await CONTROL.addUser(users[i]);
                expect(opres).toBeTruthy();
            }
    })

    it("User Exists and Not", async() => {
        const exist = await CONTROL.userExists(users[0].login);
        const notexi = await CONTROL.userExists("notExists");
        expect(exist).toBeTruthy();
        expect(notexi).toBeFalsy();
    })

    it("GetUserByLogin", async() => {
        const gotUsers = [];
        for (let i = 0; i < users.length; i++) {
            const gotUser = await CONTROL.getUserByLogin(users[i].login);
            expect(gotUser).toBeTruthy();
            gotUsers.push(gotUser);
        }
        expect(users).toEqual(gotUsers);
    })

    it("GetUserById", async() => {
        const temp_user = await CONTROL.getUserById(users[0].id);
        expect(temp_user).toEqual(users[0]);
    })

    it("RemoveUser", async() => {
        const r = await CONTROL.removeUser(users[0].login);
        expect(r).toBeTruthy();
        const gotUser = await CONTROL.getUserByLogin(users[0].login);
        expect(gotUser).toBeFalsy();
    })

    it("UpdateUser", async() => {
        const newPass = "NewPass";
        const r = await CONTROL.updateUser(users[1].id, newPass);
        expect(r).toBeTruthy();
        const gotUser = await CONTROL.getUserById(users[1].id);
        expect(gotUser).toBeTruthy();
        if (gotUser){
            expect(gotUser.password).toEqual(newPass);
        }
    })
})

class FakerRoomRepo implements IRoomRepo {
    rooms: Room[];
    constructor(rooms: Room[]) {
        this.rooms = rooms;
    }
    async addRoom(room: Room){
        this.rooms.push(room);
        return true;
    }
    async getRoom(id: number){
        const rooms = this.rooms.filter(room => room.id === id);
        return rooms.length ? rooms[0] : null;
    }
    async getRoomByNum(number: number){
        const rooms = this.rooms.filter(room => room.number === number);
        return rooms.length ? rooms[0] : null;
    }
    async updateRoom(id: number, priceperday: number, status: number) {
        const rooms = this.rooms.filter(room => room.id === id);
        if (rooms.length)
        {
            rooms[0].priceperday = priceperday;
            rooms[0].status = status;
            return true;
        }
        return false;
    }
    async removeRoom(id: number) {
        const idx: number = this.rooms.findIndex(x => x.id === id);
        if (idx > -1) {
            this.rooms.splice(idx, 1);
            return true;
        }
        return false;
    } 
    async getRooms(){
        const rooms = this.rooms;
        return rooms.length ? rooms : null;
    }
}

describe("Test RoomController", () => {
    const rooms = [
        new Room(1, 102, 15000, STATUSROOM.BUSY),
        new Room(2, 103, 10000, STATUSROOM.FREE),
        new Room(3, 105, 9000, STATUSROOM.NONE)
    ];
    const CONTROL = new RoomController(new FakerRoomRepo([]));
    
    it("Create Room", async() => {
        for (let i = 0; i < rooms.length; i++) {
            const action = await CONTROL.addRoom(rooms[i])
            expect(action).toBeTruthy();
        }
    })
    
    it ("Get Room", async() => {
        const gotRooms = [];
        for (let i = 0; i < rooms.length; i++) {
            const gotRoom = await CONTROL.getRoom(rooms[i].id);
            expect(gotRoom).toBeTruthy();
            gotRooms.push(gotRoom);
        }
        expect(gotRooms).toEqual(rooms);
    })

    it("Get Rooms", async() => {
        const r_s = await CONTROL.getRooms();
        expect(r_s).toEqual(rooms);
    })

    it("Get Room By Num", async() => {
        const r = await CONTROL.getRoomByNum(rooms[0].number);
        expect(r).toBeTruthy();
        expect(r).toEqual(rooms[0]);
    })

    it ("Update Room", async() => {
        const newPrice = 2500;
        const newStatus = STATUSROOM.FREE;
        const r = await CONTROL.updateRoom(rooms[0].id, newPrice, newStatus);
        expect(r).toBeTruthy();
        const gotRoom = await CONTROL.getRoom(rooms[0].id);
        if (gotRoom)
        {
            expect(gotRoom.priceperday).toEqual(newPrice);
            expect(gotRoom.status).toEqual(newStatus);
        }
    })

    it ("Delete Room", async() => {
        const r = await CONTROL.removeRoom(rooms[2].id);
        expect(r).toBeTruthy();
        const gotRoom = await CONTROL.getRoom(rooms[2].id);
        expect(gotRoom).toBeFalsy();
    })

        
})


class FakerPersonRepo implements IPersonRepo {
    persons: Person[];
    constructor(persons: Person[]) {
        this.persons = persons;
    }
    async addPerson(person: Person){
        this.persons.push(person);
        return true;
    }
    async getPerson(id: number){
        const persons = this.persons.filter(person => person.id === id);
        return persons.length ? persons[0] : null;
    }
    async getIdPersonByIdLogin(id_login: number){
        const persons = this.persons.filter(person => person.id_login === id_login);
        return persons.length ? persons[0].id_login : null;
    }
    async updatePerson(id: number, name: string, age: number, email: string, address: string) {
        const persons = this.persons.filter(person => person.id === id);
        if (persons.length)
        {
            persons[0].name = name;
            persons[0].age = age;
            persons[0].email = email;
            persons[0].address = address;
            return true;
        }
        return false;
    }
    async removePerson(id: number) {
        const idx: number = this.persons.findIndex(x => x.id === id);
        if (idx > -1) {
            this.persons.splice(idx, 1);
            return true;
        }
        return false;
    } 
    async getPersons(){
        const persons = this.persons;
        return persons.length ? persons : null;
    }
}

describe("Test PersonController", () => {
    const persons = [
        new Person(1, 1, "kulosis", 20, "kulo@mail.ru", "Moscow"),
        new Person(2, 25, "saber", 21, "sa@mail.ru", "Moscow"),
        new Person(3, 30, "Matt", 23, "ma@mail.ru", "Moscow")
    ];
    const CONTROL = new PersonController(new FakerPersonRepo([]));
    
    it("Create Person", async() => {
        for (let i = 0; i < persons.length; i++) {
            const action = await CONTROL.addPerson(persons[i])
            expect(action).toBeTruthy();
        }
    })
    
    it ("Get Person", async() => {
        const gotPersons = [];
        for (let i = 0; i < persons.length; i++) {
            const gotPerson = await CONTROL.getPerson(persons[i].id);
            expect(gotPerson).toBeTruthy();
            gotPersons.push(gotPerson);
        }
        expect(persons).toEqual(gotPersons);
    })

    it("Get Persons", async() => {
        const r_s = await CONTROL.getPersons();
        expect(r_s).toEqual(persons);
    })
    
    it("Get Id Person By Id_login", async() => {
        const p = await CONTROL.getIdPersonByIdLogin(persons[0].id_login);
        expect(p).toEqual(persons[0].id);
    })

    it ("Update Person", async() => {
        const newName = "Marley";
        const newAge = 25;
        const newEmail = "marley@gmail.com";
        const newAddress = "Newyork";
        const p = await CONTROL.updatePerson(persons[0].id, newName, newAge, newEmail, newAddress);
        expect(p).toBeTruthy();
        const gotPerson = await CONTROL.getPerson(persons[0].id);
        if (gotPerson)
        {
            expect(gotPerson.name).toEqual(newName);
            expect(gotPerson.age).toEqual(newAge);
        }
    })

    it ("Delete Person", async() => {
        const p = await CONTROL.removePerson(persons[2].id);
        expect(p).toBeTruthy();
        const gotPerson = await CONTROL.getPerson(persons[2].id);
        expect(gotPerson).toBeFalsy();
    })
        
})

class FakerRequestRepo implements IRequestRepo {
    requests: Request[];
    constructor(requests: Request[]) {
        this.requests = requests;
    }
    async addRequest(request: Request){
        this.requests.push(request);
        return true;
    }
    async getRequest(id: number){
        const requests = this.requests.filter(request => request.id === id);
        return requests.length ? requests[0] : null;
    }
    async updateRequest(id: number, status: number) {
        const requests = this.requests.filter(request => request.id === id);
        if (requests.length)
        {
            requests[0].status = status;
            return true;
        }
        return false;
    }
    async removeRequest(id: number) {
        const idx: number = this.requests.findIndex(x => x.id === id);
        if (idx > -1) {
            this.requests.splice(idx, 1);
            return true;
        }
        return false;
    } 
    async getRequests(){
        const requests = this.requests;
        return requests.length ? requests : null;
    }
}

describe("Test RequestController", () => {
    const requests = [
        new Request(1, 10, 2, 10000, new Date("2023-01-01"), new Date("2023-02-01"), STATUSREQ.WAIT),
        new Request(2, 11, 3, 20000, new Date("2023-04-05"), new Date("2023-04-07"), STATUSREQ.WAIT),
        new Request(3, 12, 5, 30000, new Date("2023-06-10"), new Date("2023-02-12"), STATUSREQ.WAIT)
    ];
    const CONTROL = new RequestController(new FakerRequestRepo([]));
    
    it("Create Request", async() => {
        for (let i = 0; i < requests.length; i++) {
            const action = await CONTROL.addRequest(requests[i])
            expect(action).toBeTruthy();
        }
    })
    
    it ("Get Request", async() => {
        const gotRequests = [];
        for (let i = 0; i < requests.length; i++) {
            const gotRequest = await CONTROL.getRequest(requests[i].id);
            expect(gotRequest).toBeTruthy();
            gotRequests.push(gotRequest);
        }
        expect(requests).toEqual(gotRequests);
    })

    it("Get Requests", async() => {
        const r_s = await CONTROL.getRequests();
        expect(r_s).toEqual(requests);
    })
    

    it ("Update Request", async() => {
        const newStatus = STATUSREQ.APPROVED;

        const p = await CONTROL.updateRequest(requests[0].id, newStatus);
        expect(p).toBeTruthy();
        const gotRequest = await CONTROL.getRequest(requests[0].id);
        if (gotRequest)
        {
            expect(gotRequest.status).toEqual(newStatus);
        }
    })

    it ("Delete Request", async() => {
        const p = await CONTROL.removeRequest(requests[2].id);
        expect(p).toBeTruthy();
        const gotRequest = await CONTROL.getRequest(requests[2].id);
        expect(gotRequest).toBeFalsy();
    })
        
})


class FakerHistoryRepo implements IHistoryRepo {
    histories: History[];
    constructor(histories: History[]) {
        this.histories = histories;
    }
    async addHistory(history: History){
        this.histories.push(history);
        return true;
    }
    async getHistory(id: number){
        const histories = this.histories.filter(history => history.id === id);
        return histories.length ? histories[0] : null;
    }

    async removeHistory(id: number) {
        const idx: number = this.histories.findIndex(x => x.id === id);
        if (idx > -1) {
            this.histories.splice(idx, 1);
            return true;
        }
        return false;
    } 
    async getHistories(){
        const histories = this.histories;
        return histories.length ? histories : null;
    }
}

describe("Test HistoryController", () => {
    const histories = [
        new History(1, 5, 2, new Date("2023-01-01")),
        new History(2, 7, 3, new Date("2023-04-05")),
        new History(3, 10, 5, new Date("2023-06-10"))
    ];
    const CONTROL = new HistoryController(new FakerHistoryRepo([]));
    
    it("Create History", async() => {
        for (let i = 0; i < histories.length; i++) {
            const action = await CONTROL.addHistory(histories[i])
            expect(action).toBeTruthy();
        }
    })
    
    it ("Get History", async() => {
        const gotHistorys = [];
        for (let i = 0; i < histories.length; i++) {
            const gotHistory = await CONTROL.getHistory(histories[i].id);
            expect(gotHistory).toBeTruthy();
            gotHistorys.push(gotHistory);
        }
        expect(histories).toEqual(gotHistorys);
    })

    it("Get Histories", async() => {
        const r_s = await CONTROL.getHistories();
        expect(r_s).toEqual(histories);
    })

    it ("Delete History", async() => {
        const p = await CONTROL.removeHistory(histories[2].id);
        expect(p).toBeTruthy();
        const gotHistory = await CONTROL.getHistory(histories[2].id);
        expect(gotHistory).toBeFalsy();
    })
        
})