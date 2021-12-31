import { Injectable } from '@nestjs/common';
import { HttpService } from 'nestjs-http-promise';

import { Exchange } from '../../domain/models/exchange';
import { Dca } from '../../domain/models/dca';
import { IOrderResult, IPairResult } from '../../domain/repositories/types';

import { ExchangeEnum } from '../entities/exchange.entity';
import { IExchangeApiRepository } from '../../domain/repositories/exchange-api.repository';
import { FtxApiRepository } from './ftx/ftx-api.repository';
interface IExchangeAuthParams {
  apiKey: string;
  apiSecret: string;
  subaccountName?: string;
}

@Injectable()
class ExchangeApiRepository implements IExchangeApiRepository {
  constructor(private readonly httpService: HttpService) {}

  checkApiKeyValidity(exchange: Exchange): Promise<boolean> {
    switch (exchange.name) {
      case ExchangeEnum.FTX: {
        return FtxApiRepository.checkApiKeyValidity(this.httpService, exchange);
      }
      default: {
        break;
      }
    }
  }

  createSpotOrder(dca: Dca): Promise<IOrderResult> {
    switch (dca.exchange.name) {
      case ExchangeEnum.FTX: {
        return FtxApiRepository.createSpotOrder(this.httpService, dca);
      }
      default: {
        break;
      }
    }
  }

  getAvailableSpotPairs(exchange: Exchange): Promise<IPairResult[]> {
    switch (exchange.name) {
      case ExchangeEnum.FTX: {
        return FtxApiRepository.getAvailableSpotPairs(this.httpService);
      }
      default: {
        break;
      }
    }
  }
}

export { ExchangeApiRepository };
export type { IExchangeAuthParams };
