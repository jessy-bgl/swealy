import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from 'nestjs-http-promise';
import * as crypto from 'crypto';
import { AxiosRequestHeaders } from 'axios';

import { Dca } from '../../../domain/models/dca';
import { Exchange } from '../../../domain/models/exchange';
import { IOrderResult, IPairResult } from '../../../domain/repositories/types';
import { IExchangeApiRepository } from '../../../domain/repositories/exchange-api.repository';
import {
  OrderSidesEnum,
  OrderTypesEnum,
} from '../../../domain/models/transaction';

import {
  BinanceOrderResponseTypesEnum,
  IBinanceApiPlaceOrderParams,
  IBinanceApiPlacerOrderResult,
  IBinanceAuthHttpHeaders,
  IBinanceAuthHttpParams,
  IBinanceExchangeInfoResult,
  IServerTimeResult,
} from './binance-api.types';

const BINANCE_API_BASE_URL = 'https://api.binance.com';

const handleBinanceApiError = (e: any) => {
  if (e.response)
    throw new HttpException(
      {
        status: e.response.status || 500,
        error: `BINANCE API error (${e.response.data.code}) : ${e.response.data.msg}`,
      },
      e.response.status || 500,
    );
  else throw e;
};

@Injectable()
class BinanceApiRepository implements IExchangeApiRepository {
  constructor(private readonly httpService: HttpService) {}

  private getAuthRequestHeaders(
    apiKey: string,
  ): IBinanceAuthHttpHeaders & AxiosRequestHeaders {
    return { 'X-MBX-APIKEY': apiKey };
  }

  private async getAuthRequestParams(
    apiSecret: string,
    params?: any,
  ): Promise<IBinanceAuthHttpParams> {
    let signature_payload = '';
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (!signature_payload) signature_payload = `${key}=${value}`;
        else signature_payload += `&${key}=${value}`;
      }
    }
    const timestamp = await this.getServerTime();
    signature_payload += params
      ? `&timestamp=${timestamp}`
      : `timestamp=${timestamp}`;
    const signature = crypto
      .createHmac('sha256', apiSecret)
      .update(signature_payload)
      .digest('hex');
    return { timestamp, signature };
  }

  private async getServerTime(): Promise<string> {
    try {
      const endpoint = `/api/v3/time`;
      const res = await this.httpService.get<IServerTimeResult>(
        `${BINANCE_API_BASE_URL}${endpoint}`,
      );
      if (!res.data || !res.data.serverTime)
        throw new Error('serverTime not found');
      return res.data.serverTime.toString();
    } catch (e) {
      handleBinanceApiError(e);
    }
  }

  async checkApiKeyValidity(exchange: Exchange): Promise<void> {
    try {
      const endpoint = '/sapi/v1/account/apiRestrictions';
      const { apiSecret, apiKey } = exchange;
      const headers = this.getAuthRequestHeaders(apiKey);
      const params = this.getAuthRequestParams(apiSecret);
      await this.httpService.get(`${BINANCE_API_BASE_URL}${endpoint}`, {
        headers,
        params,
      });
      // TODO : check 'enableSpotAndMarginTrading' boolean in response data
    } catch (e) {
      handleBinanceApiError(e);
    }
  }

  async createSpotOrder(dca: Dca): Promise<IOrderResult> {
    try {
      const requestParams: IBinanceApiPlaceOrderParams = {
        symbol: dca.pair.replace('/', ''),
        side: OrderSidesEnum.BUY,
        type: OrderTypesEnum.MARKET,
        quoteOrderQty: dca.amount,
        recvWindow: 60000,
        newOrderRespType: BinanceOrderResponseTypesEnum.FULL,
      };
      const headers = this.getAuthRequestHeaders(dca.exchange.apiKey);
      const { timestamp, signature } = await this.getAuthRequestParams(
        dca.exchange.apiSecret,
        requestParams,
      );
      const res = await this.httpService.post<IBinanceApiPlacerOrderResult>(
        `${BINANCE_API_BASE_URL}/api/v3/order`,
        undefined,
        { headers, params: { ...requestParams, timestamp, signature } },
      );
      const { transactTime, fills, executedQty, status, type } = res.data;
      return {
        datetime: new Date(transactTime),
        price: Number(fills[0].price),
        size: Number(executedQty),
        status,
        type,
      };
    } catch (e) {
      handleBinanceApiError(e);
    }
  }

  async getAvailableSpotPairs(): Promise<IPairResult[]> {
    try {
      const res = await this.httpService.get<IBinanceExchangeInfoResult>(
        `${BINANCE_API_BASE_URL}/api/v3/exchangeInfo`,
      );
      return res.data.symbols
        .filter(
          (d) => d.status === 'TRADING' && d.isSpotTradingAllowed === true,
        )
        .map((d) => ({ name: `${d.baseAsset}/${d.quoteAsset}` }));
    } catch (e) {
      handleBinanceApiError(e);
    }
  }
}

export { BinanceApiRepository };
