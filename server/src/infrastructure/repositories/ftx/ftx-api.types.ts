import { OrderStatusEnum } from '../../../domain/repositories/types';
import {
  OrderSidesEnum,
  OrderTypesEnum,
} from '../../../domain/models/transaction';

interface IFtxAuthHttpHeaders {
  'FTX-TS': string;
  'FTX-KEY': string;
  'FTX-SIGN': string;
  'FTX-SUBACCOUNT': string;
}

interface IFtxApiResponse<T> {
  success: boolean;
  result: T;
}

interface IFtxApiPlaceOrderBody {
  market: string;
  side: OrderSidesEnum;
  price: number;
  type: OrderTypesEnum;
  size: number;
}

interface IFtxPlaceOrderResult {
  createdAt: Date;
  price: number;
  size: number;
  status: OrderStatusEnum;
  type: OrderTypesEnum;
}

export type {
  IFtxApiResponse,
  IFtxAuthHttpHeaders,
  IFtxApiPlaceOrderBody,
  IFtxPlaceOrderResult,
};
