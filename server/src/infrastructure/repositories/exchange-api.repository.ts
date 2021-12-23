import { Injectable } from '@nestjs/common';
import { HttpService } from 'nestjs-http-promise';

import { FtxApiRepository } from './ftx/ftx-api.repository';
import { Exchange, ExchangeEnum } from '../entities/exchange.entity';
import {
  IExchangeApiRepository,
  OrderTypesEnum,
} from '../../domain/repositories/exchange-api.repository';

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

  createSpotOrder(
    exchange: Exchange,
    type: OrderTypesEnum,
    market: string,
    amount: number,
  ): Promise<void> {
    return Promise.reject();
  }

  getAvailableSpotPairs(exchange: Exchange) {
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
