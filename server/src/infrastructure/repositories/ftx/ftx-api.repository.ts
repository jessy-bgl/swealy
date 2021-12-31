import * as crypto from 'crypto';
import { AxiosRequestHeaders } from 'axios';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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
import { IExchangeAuthParams } from '../exchange-api.repository';
import {
  IFtxApiResponse,
  IFtxAuthHttpHeaders,
  IFtxApiPlaceOrderBody,
  IFtxPlaceOrderResult,
} from './ftx-api.types';

const FTX_API_BASE_URL = 'https://ftx.com/api';

@Injectable()
class FtxApiRepository implements Partial<IExchangeApiRepository> {
  static getAuthRequestHeaders(
    httpMethod: HttpMethodsEnum,
    endpoint: string,
    params: IExchangeAuthParams,
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

    return {
      'FTX-TS': ftx_ts,
      'FTX-KEY': ftx_key,
      'FTX-SIGN': ftx_sign,
      'FTX-SUBACCOUNT': ftx_subaccount,
    };
  }

  static async checkApiKeyValidity(
    httpService: HttpService,
    exchange: Exchange,
  ): Promise<boolean> {
    try {
      const res = await httpService.get(`${FTX_API_BASE_URL}/account`, {
        headers: this.getAuthRequestHeaders(
          HttpMethodsEnum.GET,
          '/api/account',
          exchange,
        ),
      });
      if (res.data.success === true) return true;
      else throw new InternalServerErrorException('FTX API error');
    } catch (e) {
      throw new HttpException(
        {
          status: e.response.status,
          error: e.response.data.error,
        },
        e.response.status,
      );
    }
  }

  static async createSpotOrder(
    httpService: HttpService,
    dca: Dca,
  ): Promise<IOrderResult> {
    try {
      const currentPrice = await this.getSpotPairCurrentPrice(
        httpService,
        dca.pair,
      );
      const requestBody: IFtxApiPlaceOrderBody = {
        market: dca.pair,
        side: OrderSidesEnum.BUY,
        type: OrderTypesEnum.MARKET,
        price: null, // null because it is a market order
        size: dca.amount / currentPrice,
      };
      const res = await httpService.post(
        `${FTX_API_BASE_URL}/orders`,
        requestBody,
        {
          headers: this.getAuthRequestHeaders(
            HttpMethodsEnum.POST,
            '/api/orders',
            dca.exchange,
            JSON.stringify(requestBody),
          ),
        },
      );
      if (!res.data.success) throw new Error('FTX API error');
      const { createdAt, size, status, type } = res.data
        .result as IFtxPlaceOrderResult;
      // NB : we don't use the price from the result because it is null as we place a market order
      return {
        datetime: createdAt,
        price: currentPrice,
        size,
        status,
        type,
      };
    } catch (e) {
      if (e.response)
        throw new Error(
          `FTX API error (${e.response.status}) ${e.response.data.error}`,
        );
      else throw e;
    }
  }

  static async getAvailableSpotPairs(
    httpService: HttpService,
  ): Promise<IPairResult[]> {
    try {
      const res = await httpService.get<IFtxApiResponse<IPairResult[]>>(
        `${FTX_API_BASE_URL}/markets`,
      );
      if (!res.data || !res.data.success)
        throw new InternalServerErrorException('FTX api returned an error');
      return res.data.result
        .filter((d) => d.type === 'spot')
        .map((d) => ({
          name: d.name,
          type: d.type,
          price: d.price,
          priceIncrement: d.priceIncrement,
          sizeIncrement: d.sizeIncrement,
        }));
    } catch (e) {
      throw new HttpException(
        {
          status: e.response.status,
          error: e.response.data.error,
        },
        e.response.status,
      );
    }
  }

  static async getSpotPairCurrentPrice(
    httpService: HttpService,
    pair: string,
  ): Promise<number> {
    try {
      const res = await httpService.get<IFtxApiResponse<IPairResult>>(
        `${FTX_API_BASE_URL}/markets/${pair}`,
      );
      if (!res.data || !res.data.success)
        throw new InternalServerErrorException('FTX api returned an error');
      return res.data.result.price;
    } catch (e) {
      throw e;
    }
  }
}

export { FtxApiRepository };
