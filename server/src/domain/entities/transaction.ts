import { Exchange } from './exchange';

enum OrderTypesEnum {
  'LIMIT' = 'limit',
  'MARKET' = 'market',
}

class Transaction {
  datetime: Date;
  success: boolean;
  amount: number;
  exchange: Exchange;
  pair: string;
  price: number;
  size: number;
  type: OrderTypesEnum;
  description?: string;
}

export { Transaction, OrderTypesEnum };
