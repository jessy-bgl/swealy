import { OrderTypesEnum } from '../models/transaction';

enum HttpMethodsEnum {
  'GET' = 'GET',
  'POST' = 'POST',
}

enum PairTypesEnum {
  SPOT = 'spot',
  FUTURE = 'future',
}

// NB : this depends on the Exchange API
// enum OrderStatusEnum {
//   NEW = 'new',
//   OPEN = 'open',
//   CLOSED = 'closed',
// }

interface IPairResult {
  name: string; // NB : '/' separator between base and quote assets is expected
}

interface IOrderResult {
  datetime: Date;
  price: number;
  size: number;
  status: string;
  type: OrderTypesEnum;
}

export type { IPairResult, IOrderResult };
export { HttpMethodsEnum, PairTypesEnum };
