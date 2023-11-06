import { History } from '../../model/History';

export interface IHistoryRepo {
    addHistory(History: History): Promise<Boolean>;
    getHistory(id: number): Promise<History | null>;
    removeHistory(id: number): any;
    getHistories(): any;
}