import * as crypto from 'crypto';
import { AxiosRequestHeaders } from 'axios';
import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from 'nestjs-http-promise';

import {
  HttpMethodsEnum,
  IOrderResult,
  IPairResult,
} from '../../../domain/repositories/types';
import { Exchange } from '../../../domain/models/exchange';
import { Dca } from '../../../domain/models/dca';
import {
  OrderSidesEnum,
  OrderTypesEnum,
} from '../../../domain/models/transaction';

import { IExchangeApiRepository } from '../../../domain/repositories/exchange-api.repository';

import {
  IFtxApiResponse,
  IFtxAuthHttpHeaders,
  IFtxApiPlaceOrderBody,
  IFtxPlaceOrderResult,
  IFtxPairResult,
  IFtxAuthParams,
} from './ftx-api.types';

const FTX_API_BASE_URL = 'https://ftx.com/api';
const FTX_API_DEFAULT_ERROR = 'FTX api returned an error';

const handleFtxApiError = (e: any) => {
  if (e.response)
    throw new HttpException(
      {
        status: e.response.status || 500,
        error: `FTX API error : ${e.response.data.error}`,
      },
      e.response.status || 500,
    );
  else throw e;
};

const handleFtxApiSuccessError = (data: IFtxApiResponse<any>) => {
  if (!data || !data.success) throw new Error(FTX_API_DEFAULT_ERROR);
};

@Injectable()
class FtxApiRepository implements IExchangeApiRepository {
  constructor(private readonly httpService: HttpService) {}

  private getAuthRequestHeaders(
    httpMethod: HttpMethodsEnum,
    endpoint: string,
    params: IFtxAuthParams,
    body?: string,
  ): IFtxAuthHttpHeaders & AxiosRequestHeaders {
    const { apiKey, apiSecret, subaccountName } = params;
    const ftx_ts = Date.now().toString();
    const ftx_key = apiKey;
    const ftx_secret = apiSecret;
    const ftx_subaccount = subaccountName;
    const signature_payload = `${ftx_ts}${httpMethod}${endpoint}`;

    const ftx_sign = crypto
      .createHmac('sha256', ftx_secret)
      .update(body ? signature_payload + body : signature_payload)
      .digest('hex');

    const res = {
      'FTX-TS': ftx_ts,
      'FTX-KEY': ftx_key,
      'FTX-SIGN': ftx_sign,
    };
    if (ftx_subaccount) res['FTX-SUBACCOUNT'] = ftx_subaccount;
    return res;
  }

  async checkApiKeyValidity(exchange: Exchange): Promise<void> {
    try {
      const headers = this.getAuthRequestHeaders(
        HttpMethodsEnum.GET,
        '/api/account',
        exchange,
      );
      const res = await this.httpService.get<IFtxApiResponse<any>>(
        `${FTX_API_BASE_URL}/account`,
        { headers },
      );
      handleFtxApiSuccessError(res.data);
    } catch (e) {
      handleFtxApiError(e);
    }
  }

  async createSpotOrder(dca: Dca): Promise<IOrderResult> {
    try {
      const currentPrice = await this.getSpotPairCurrentPrice(dca.pair);
      const requestBody: IFtxApiPlaceOrderBody = {
        market: dca.pair,
        side: OrderSidesEnum.BUY,
        type: OrderTypesEnum.MARKET,
        price: null, // null because it is a market order
        size: dca.amount / currentPrice,
      };
      const headers = this.getAuthRequestHeaders(
        HttpMethodsEnum.POST,
        '/api/orders',
        dca.exchange,
        JSON.stringify(requestBody),
      );
      const res = await this.httpService.post<
        IFtxApiResponse<IFtxPlaceOrderResult>
      >(`${FTX_API_BASE_URL}/orders`, requestBody, { headers });
      handleFtxApiSuccessError(res.data);
      const { createdAt, size, status, type } = res.data.result;
      // NB : we don't use the price from the result because it is null as we place a market order
      return {
        datetime: createdAt,
        price: currentPrice,
        size,
        status,
        type,
      };
    } catch (e) {
      handleFtxApiError(e);
    }
  }

  async getAvailableSpotPairs(): Promise<IPairResult[]> {
    try {
      const res = await this.httpService.get<IFtxApiResponse<IFtxPairResult[]>>(
        `${FTX_API_BASE_URL}/markets`,
      );
      handleFtxApiSuccessError(res.data);
      return res.data.result
        .filter((d) => d.type === 'spot')
        .map((d) => ({
          name: d.name,
        }));
    } catch (e) {
      handleFtxApiError(e);
    }
  }

  private async getSpotPairCurrentPrice(pair: string): Promise<number> {
    try {
      const res = await this.httpService.get<IFtxApiResponse<IFtxPairResult>>(
        `${FTX_API_BASE_URL}/markets/${pair}`,
      );
      handleFtxApiSuccessError(res.data);
      return res.data.result.price;
    } catch (e) {
      handleFtxApiError(e);
    }
  }
}

export { FtxApiRepository };
