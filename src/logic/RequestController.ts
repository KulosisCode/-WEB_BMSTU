import { IRequestRepo } from "../db/interfaceDB/IRequestRepo"; 
import { Request } from "../model/Request";

export class RequestController {
    requestRepo: IRequestRepo;
    constructor(requestRepo: IRequestRepo) {
        this.requestRepo = requestRepo;
    }

    async addRequest(request: Request) {
        return await this.requestRepo.addRequest(request);
    }

    async getRequest(id: number) {
        return await this.requestRepo.getRequest(id);
    }

    async updateRequest(id: number, status: number) {
        return await this.requestRepo.updateRequest(id, status);
    }

    async removeRequest(id: number) {
        return await this.requestRepo.removeRequest(id);
    }

    async getRequests() {
        return await this.requestRepo.getRequests();
    }
}