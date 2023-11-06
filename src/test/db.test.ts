import { User, ROLE } from "../model/User";
import { Room, STATUSROOM } from '../model/Room';
import { Person } from "../model/Person";
import { Request, STATUSREQ } from "../model/Request";
import { History } from "../model/History";
import { describe } from "node:test"; 
import { ConnParams } from '../db/ConnParams';
import { DbUserRepo } from "../db/DbUserRepo";
import { DbRoomRepo } from "../db/DbRoomRepo";
import { DbGuestRepo } from "../db/DbGuestRepo";
import { DbStaffRepo } from "../db/DbStaffRepo";
import { DbRequestRepo } from "../db/DbRequestRepo";
import { DbHistoryRepo } from "../db/DbHistoryRepo";
const exec = require("child_process").execSync;

const USERNAME = "postgres";
const HOST = "localhost";
const DATABASE = "my_ppo";
const PASSWORD = "haoasd";
const PORT = 5432;

const prepareTestDB = () => {
    const script_template = `(set PGPASSWORD=${PASSWORD}) && psql -h ${HOST} -U ${USERNAME} -d ${DATABASE} -f ./sql/init.sql`;
    exec(script_template);
}

const connParams: ConnParams = {
    user: USERNAME,
    host: HOST,
    database: DATABASE,
    password: PASSWORD,
    port: PORT,
};

beforeAll(() => {
    prepareTestDB();
});
 
describe("Test UserRepo", () => {
    const users = [
        new User(1, "kulosis", "password", ROLE.GUEST),
        new User(2, "Matt", "password", ROLE.STAFF),
        new User(3, "Admin", "password", ROLE.ADMIN)
    ];

    const CONTROL = new DbUserRepo(connParams);

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

    it("RemoveUser", async() => {
        const r = await CONTROL.removeUser(users[0].login);
        expect(r).toBeTruthy();
        const gotUser = await CONTROL.getUserByLogin(users[0].login);
        expect(gotUser).toBeFalsy();
    })

})

describe("Test RoomRepo", () => {
    const rooms = [
        new Room(1, 102, 15000, STATUSROOM.BUSY),
        new Room(2, 103, 10000, STATUSROOM.FREE),
        new Room(3, 105, 9000, STATUSROOM.NONE)
    ];

    const CONTROL = new DbRoomRepo(connParams);
    
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

describe("Test GuestRepo", () => {
    const persons = [
        new Person(1, 1, "kulosis", 20, "kulo@mail.ru", "Moscow"),
        new Person(2, 25, "saber", 21, "sa@mail.ru", "Moscow"),
        new Person(3, 30, "Matt", 23, "ma@mail.ru", "Moscow")
    ];
    const CONTROL = new DbGuestRepo(connParams);
    
    it("Create Guest", async() => {
        for (let i = 0; i < persons.length; i++) {
            const action = await CONTROL.addPerson(persons[i])
            expect(action).toBeTruthy();
        }
    })
    
    it ("Get Guest", async() => {
        const gotPersons = [];
        for (let i = 0; i < persons.length; i++) {
            const gotPerson = await CONTROL.getPerson(persons[i].id);
            expect(gotPerson).toBeTruthy();
            gotPersons.push(gotPerson);
        }
        expect(persons).toEqual(gotPersons);
    })

    it("Get Guests", async() => {
        const r_s = await CONTROL.getPersons();
        expect(r_s).toEqual(persons);
    })
    
    it("Get Id Guest By Id_login", async() => {
        const p = await CONTROL.getIdPersonByIdLogin(persons[0].id_login);
        expect(p).toEqual(persons[0].id);
    })

    it ("Update Guest", async() => {
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

    it ("Delete Guest", async() => {
        const p = await CONTROL.removePerson(persons[2].id);
        expect(p).toBeTruthy();
        const gotPerson = await CONTROL.getPerson(persons[2].id);
        expect(gotPerson).toBeFalsy();
    })
})

describe("Test StaffRepo", () => {
    const persons = [
        new Person(1, 1, "kulosis", 20, "kulo@mail.ru", "Moscow"),
        new Person(2, 25, "saber", 21, "sa@mail.ru", "Moscow"),
        new Person(3, 30, "Matt", 23, "ma@mail.ru", "Moscow")
    ];
    const CONTROL = new DbStaffRepo(connParams);
    
    it("Create Staff", async() => {
        for (let i = 0; i < persons.length; i++) {
            const action = await CONTROL.addPerson(persons[i])
            expect(action).toBeTruthy();
        }
    })
    
    it ("Get Staff", async() => {
        const gotPersons = [];
        for (let i = 0; i < persons.length; i++) {
            const gotPerson = await CONTROL.getPerson(persons[i].id);
            expect(gotPerson).toBeTruthy();
            gotPersons.push(gotPerson);
        }
        expect(persons).toEqual(gotPersons);
    })

    it("Get Staffs", async() => {
        const r_s = await CONTROL.getPersons();
        expect(r_s).toEqual(persons);
    })
    
    it("Get Id Staff By Id_login", async() => {
        const p = await CONTROL.getIdPersonByIdLogin(persons[0].id_login);
        expect(p).toEqual(persons[0].id);
    })

    it ("Update Staff", async() => {
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

    it ("Delete Staff", async() => {
        const p = await CONTROL.removePerson(persons[2].id);
        expect(p).toBeTruthy();
        const gotPerson = await CONTROL.getPerson(persons[2].id);
        expect(gotPerson).toBeFalsy();
    })
})

describe("Test RequestRepo", () => {
    const requests = [
        new Request(1, 10, 2, 10000, new Date("2023-01-01"), new Date("2023-02-01"), STATUSREQ.WAIT),
        new Request(2, 11, 3, 20000, new Date("2023-04-05"), new Date("2023-04-07"), STATUSREQ.WAIT),
        new Request(3, 12, 5, 30000, new Date("2023-06-10"), new Date("2023-02-12"), STATUSREQ.WAIT)
    ];
    const CONTROL = new DbRequestRepo(connParams);
    
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

describe("Test HistoryRepo", () => {
    const histories = [
        new History(1, 5, 2, new Date("2023-01-01")),
        new History(2, 7, 3, new Date("2023-04-05")),
        new History(3, 10, 5, new Date("2023-06-10"))
    ];
    const CONTROL = new DbHistoryRepo(connParams);
    
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