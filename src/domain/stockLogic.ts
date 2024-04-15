import { CurrencyService } from "../port/currencyService";
import { Repository } from "../port/repository";
import { StockWithCurrencies } from "./types";

export default class StockService {
  private readonly repository: Repository;
  private readonly currencyService: CurrencyService;
  constructor(repository: Repository, currencyService: CurrencyService) {
    this.repository = repository;
    this.currencyService = currencyService;
  }
  
  public getStockWithCurrencies = async (
    stockID: string
  ): Promise<StockWithCurrencies | Error> => {
    try {
      const stock = await this.repository.getStockData(stockID);
      const currencyList = await this.currencyService.getCurrenciesData();

      let stockWithCurrencies : StockWithCurrencies = {
        stock: stock.id,
        values: {},
      };

      for (const currency in currencyList.rates) {
        stockWithCurrencies.values[currency] = Number((stock.value * currencyList.rates[currency]).toFixed(3))
      }
      return stockWithCurrencies;
    } catch (err) {
      throw err;
    }
  };
}
