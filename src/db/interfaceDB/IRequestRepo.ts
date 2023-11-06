import { Request } from '../../model/Request';

export interface IRequestRepo {
    addRequest(request: Request): Promise<Boolean>;
    getRequest(id: number): Promise<Request | null>;
    updateRequest(id: number, status: number): any;
    removeRequest(id: number): any;
    getRequests(): Promise<Request[] | null>
}