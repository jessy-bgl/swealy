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
  IPairsResult,
} from '../../../domain/repositories/types';
import { Exchange } from '../../../domain/models/exchange';
import { IFtxApiResponse, IFtxAuthHttpHeaders } from './ftx-api.types';

import { IExchangeApiRepository } from '../../../domain/repositories/exchange-api.repository';
import { IExchangeAuthParams } from '../exchange-api.repository';

const FTX_API_BASE_URL = 'https://ftx.com/api';

@Injectable()
class FtxApiRepository implements Partial<IExchangeApiRepository> {
  static getAuthRequestHeaders(
    httpMethod: HttpMethodsEnum,
    endpoint: string,
    params: IExchangeAuthParams,
  ): IFtxAuthHttpHeaders {
    const { apiKey, apiSecret, subaccountName } = params;
    const ftx_ts = Date.now().toString();
    const ftx_key = apiKey;
    const ftx_secret = apiSecret;
    const ftx_subaccount = subaccountName;
    const signature_payload = `${ftx_ts}${httpMethod}${endpoint}`;

    const ftx_sign = crypto
      .createHmac('sha256', ftx_secret)
      .update(signature_payload)
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
      const headers = this.getAuthRequestHeaders(
        HttpMethodsEnum.GET,
        '/api/account',
        exchange,
      ) as unknown as AxiosRequestHeaders;

      const res: any = await httpService.get(`${FTX_API_BASE_URL}/account`, {
        headers,
      });

      if (res.data.success === true) return true;
      else throw new InternalServerErrorException('FTX api returned false');
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

  static createSpotOrder(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  static async getAvailableSpotPairs(
    httpService: HttpService,
  ): Promise<IPairsResult[]> {
    try {
      const res = await httpService.get<IFtxApiResponse<IPairsResult[]>>(
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
      throw e;
    }
  }
}

export { FtxApiRepository };
