import { Dca } from './dca';

enum OrderTypesEnum {
  'LIMIT' = 'limit',
  'MARKET' = 'market',
}

class Transaction {
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

export { Transaction, OrderTypesEnum };
