import { Injectable } from '@nestjs/common';
import { Exchange, ExchangeEnum } from '../../domain/entities/exchange.entity';
import { IExchangeApiRepository } from '../../domain/repositories/exchange-api.repository.interface';
import { HttpService } from 'nestjs-http-promise';
import { FtxApiRepository } from './ftx-api.repository';

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

  createSpotOrder(): Promise<void> {
    return Promise.reject();
  }

  getAvailableSpotMarkets(): Promise<string[]> {
    return Promise.reject();
  }
}

export { ExchangeApiRepository };
export type { IExchangeAuthParams };
