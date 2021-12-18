import * as crypto from 'crypto';
import { AxiosRequestHeaders } from 'axios';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { IExchangeApiRepository } from '../../domain/repositories/exchange-api.repository.interface';
import { IExchangeAuthParams } from './exchange-api.repository';
import { Exchange } from '../../domain/entities/exchange.entity';
import { HttpService } from 'nestjs-http-promise';

const FTX_API_BASE_URL = 'https://ftx.com/api';

interface IFtxAuthHttpHeaders {
  'FTX-TS': string;
  'FTX-KEY': string;
  'FTX-SIGN': string;
  'FTX-SUBACCOUNT': string;
}

enum HttpMethodsEnum {
  'GET' = 'GET',
  'POST' = 'POST',
}

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

  static getAvailableSpotMarkets(): Promise<string[]> {
    throw new Error('Method not implemented.');
  }
}

export { FtxApiRepository };
