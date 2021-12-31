import { OrderTypesEnum } from '../models/transaction';

enum HttpMethodsEnum {
  'GET' = 'GET',
  'POST' = 'POST',
}

enum PairTypesEnum {
  SPOT = 'spot',
  FUTURE = 'future',
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
  status: string; // TODO : create an enum
  type: OrderTypesEnum;
}

export type { IPairResult, IOrderResult };
export { HttpMethodsEnum, PairTypesEnum };
