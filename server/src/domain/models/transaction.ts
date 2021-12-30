import { Dca } from './dca';

enum OrderTypesEnum {
  'LIMIT' = 'limit',
  'MARKET' = 'market',
}

enum OrderSidesEnum {
  'BUY' = 'buy',
  'SELL' = 'sell',
}

class Transaction {
  id: string;
  datetime: Date;
  success: boolean;
  amount: number;
  dca: Dca;
  pair: string;
  price: number;
  size: number;
  type: OrderTypesEnum;
  description?: string;
}

export { Transaction, OrderTypesEnum, OrderSidesEnum };
