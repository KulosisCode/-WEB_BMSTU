export enum STATUSROOM {
    NONE,
    FREE,
    BUSY
}
export class Room {
    id: number;
    number: number;
    priceperday: number;
    status: STATUSROOM;
    constructor(id: number, number: number, priceperday: number, status: STATUSROOM) {
        this.id = id;
        this.number = number;
        this.priceperday = priceperday;
        this.status = status;
    }
}