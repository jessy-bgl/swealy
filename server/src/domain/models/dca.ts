import { Exchange } from './exchange';

class Dca {
  id: string;
  isActive: boolean;
  exchange: Exchange;
  pair: string;
  frequencyInDays: number;
  hour: number;
  amount: number;
  successfulTransactionsCounter: number;
  // nextTransactionDatetime: Date;
}

export { Dca };
