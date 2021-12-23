import { Injectable } from '@nestjs/common';
import { HttpService } from 'nestjs-http-promise';

import { FtxApiRepository } from './ftx/ftx-api.repository';
import {
  Exchange as ExchangeModel,
  ExchangeEnum,
} from '../entities/exchange.entity';
import { IExchangeApiRepository } from '../../domain/repositories/exchange-api.repository';
import { Exchange } from '../../domain/entities/exchange';

interface IExchangeAuthParams {
  apiKey: string;
  apiSecret: string;
  subaccountName?: string;
}

@Injectable()
class ExchangeApiRepository implements IExchangeApiRepository {
  constructor(private readonly httpService: HttpService) {}

  checkApiKeyValidity(exchange: ExchangeModel): Promise<boolean> {
    switch (exchange.name) {
      case ExchangeEnum.FTX: {
        return FtxApiRepository.checkApiKeyValidity(this.httpService, exchange);
      }
      default: {
        break;
      }
    }
  }

  createSpotOrder(): Promise<void> {
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
