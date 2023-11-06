export class History {
    id: number;
    id_request: number;
    id_staff: number;
    timeadded: Date;
    constructor(id: number, id_request: number, id_staff: number, timeadded: Date)
    {
        this.id = id;
        this.id_request = id_request;
        this.id_staff = id_staff;
        this.timeadded = timeadded;
    }
}