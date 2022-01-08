import { OrderTypesEnum } from '../models/transaction';

enum HttpMethodsEnum {
  'GET' = 'GET',
  'POST' = 'POST',
}

enum PairTypesEnum {
  SPOT = 'spot',
  FUTURE = 'future',
}

enum OrderStatusEnum {
  NEW = 'new',
  OPEN = 'open',
  CLOSED = 'closed',
}

interface IPairResult {
  name: string;
  type: PairTypesEnum;
  price: number;
  priceIncrement: number;
  sizeIncrement: number;
}

interface IOrderResult {
  datetime: Date;
  price: number;
  size: number;
  status: OrderStatusEnum;
  type: OrderTypesEnum;
}

export type { IPairResult, IOrderResult };
export { HttpMethodsEnum, PairTypesEnum, OrderStatusEnum };
