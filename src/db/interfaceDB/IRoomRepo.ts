import { Room } from '../../model/Room';
export interface IRoomRepo {
    addRoom(room: Room): Promise<boolean>;
    getRoom(id: number): Promise<Room | null>;
    getRoomByNum(number: number): Promise<Room | null>;
    updateRoom(id: number, priceperday: number, status: number): any;
    removeRoom(id: number): any;
    getRooms(): Promise<Room[] | null>;
}