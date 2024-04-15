import { Stock } from "../domain/types";

export interface Repository {
    getStockData(stockID: string): Promise<Stock>;
}