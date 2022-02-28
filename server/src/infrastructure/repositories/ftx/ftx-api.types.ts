import { PairTypesEnum } from '../../../domain/repositories/types';
import {
  OrderSidesEnum,
  OrderTypesEnum,
} from '../../../domain/models/transaction';

interface IFtxAuthHttpHeaders {
  'FTX-TS': string;
  'FTX-KEY': string;
  'FTX-SIGN': string;
  'FTX-SUBACCOUNT'?: string;
}

interface IFtxAuthParams {
  apiKey: string;
  apiSecret: string;
  subaccountName?: string;
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
  status: string;
  type: OrderTypesEnum;
}

interface IFtxPairResult {
  name: string;
  type: PairTypesEnum;
  price: number;
  priceIncrement: number;
  sizeIncrement: number;
}

export type {
  IFtxApiResponse,
  IFtxAuthHttpHeaders,
  IFtxApiPlaceOrderBody,
  IFtxPlaceOrderResult,
  IFtxPairResult,
  IFtxAuthParams,
};
