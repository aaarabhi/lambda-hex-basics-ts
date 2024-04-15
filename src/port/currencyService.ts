import { Currency } from "../domain/types";

export interface CurrencyService {
    getCurrenciesData(): Promise<Currency>;
}