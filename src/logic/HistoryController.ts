import { IHistoryRepo } from "../db/interfaceDB/IHistoryRepo";
import { History } from '../model/History';

export class HistoryController {
    historyRepo: IHistoryRepo;
    constructor(historyRepo: IHistoryRepo)
    {
        this.historyRepo = historyRepo;
    }

    async addHistory(history: History)
    {
        return await this.historyRepo.addHistory(history);
    }

    async getHistory(id: number)
    {
        return await this.historyRepo.getHistory(id);
    }

    async removeHistory(id: number)
    {
        return await this.historyRepo.removeHistory(id);
    }

    async getHistories()
    {
        return await this.historyRepo.getHistories();
    }
}