export enum STATUSREQ {
    WAIT,
    APPROVED,
    DENIED
}
export class Request {
    id: number;
    id_guest: number;
    id_room: number;
    price: number;
    timein: Date;
    timeout: Date;
    status: STATUSREQ;
    constructor(id: number, id_guest: number, id_room: number, 
            price: number, timein: Date, timeout: Date,  status: STATUSREQ)
    {
        this.id = id;
        this.id_guest = id_guest;
        this.id_room = id_room;
        this.price = price;
        this.timein = timein;
        this.timeout = timeout;
        this.status = status;
    }
}