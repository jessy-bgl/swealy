import { OrderTypesEnum } from '../models/transaction';

enum HttpMethodsEnum {
  'GET' = 'GET',
  'POST' = 'POST',
}

interface IPairsResult {
  name: string;
  type: string;
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

export type { IPairsResult, IOrderResult };
export { HttpMethodsEnum };
