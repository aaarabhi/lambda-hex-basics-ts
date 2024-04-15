import axios, { AxiosResponse } from "axios";
import { CurrencyService } from "../../port/currencyService";
import { Currency } from "../../domain/types";

export class CurrencyHandler implements CurrencyService {
  async getCurrenciesData(): Promise<Currency> {
    try {
      const getCurr: AxiosResponse<Currency> = await axios.get(
        "https://api.frankfurter.app/latest?amount=1"
      );
      return getCurr.data;
    } catch (err) {
      throw err;
    }
  }
}
