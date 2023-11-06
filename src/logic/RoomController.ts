import { IRoomRepo } from "../db/interfaceDB/IRoomRepo";
import { Room } from "../model/Room";

export class RoomController {
    RoomRepo: IRoomRepo;
    constructor(RoomRepo: IRoomRepo) {
        this.RoomRepo = RoomRepo;
    }

    async addRoom(room: Room) {
        return await this.RoomRepo.addRoom(room);
    }

    async getRoom(id: number) {
        return await this.RoomRepo.getRoom(id);
    }

    async getRoomByNum(number: number) {
        return await this.RoomRepo.getRoomByNum(number);
    }

    async updateRoom(id: number, priceperday: number, status: number) {
        return await this.RoomRepo.updateRoom(id, priceperday, status);
    }
    
    async removeRoom(id: number) {
        return await this.RoomRepo.removeRoom(id);
    }

    async getRooms() {
        return await this.RoomRepo.getRooms();
    }
}