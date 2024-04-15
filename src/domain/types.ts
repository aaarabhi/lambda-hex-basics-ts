export type Stock =  {
    id: string;
    value: number;
}

export type Currency = {
    amount: number;
    base: string;
    date: string;
    rates: {
        [key: string]: number;
    }
}

export type StockWithCurrencies = {
    stock: string;
    values: {
      [currency: string]: number;
    }
}

