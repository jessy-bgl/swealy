import { Injectable } from '@nestjs/common';

import { Exchange } from '../../domain/models/exchange';
import { Dca } from '../../domain/models/dca';
import { IOrderResult, IPairResult } from '../../domain/repositories/types';

import { ExchangesEnum } from '../entities/exchange.entity';
import { IExchangeApiRepository } from '../../domain/repositories/exchange-api.repository';

import { FtxApiRepository } from './ftx/ftx-api.repository';
import { BinanceApiRepository } from './binance/binance-api.repository';

@Injectable()
class ExchangeApiRepository implements IExchangeApiRepository {
  constructor(
    private readonly ftxApiRepository: FtxApiRepository,
    private readonly binanceApiRepository: BinanceApiRepository,
  ) {}

  checkApiKeyValidity(exchange: Exchange): Promise<void> {
    switch (exchange.name) {
      case ExchangesEnum.FTX: {
        return this.ftxApiRepository.checkApiKeyValidity(exchange);
      }
      case ExchangesEnum.BINANCE: {
        return this.binanceApiRepository.checkApiKeyValidity(exchange);
      }
      default: {
        break;
      }
    }
  }

  createSpotOrder(dca: Dca): Promise<IOrderResult> {
    switch (dca.exchange.name) {
      case ExchangesEnum.FTX: {
        return this.ftxApiRepository.createSpotOrder(dca);
      }
      case ExchangesEnum.BINANCE: {
        return this.binanceApiRepository.createSpotOrder(dca);
      }
      default: {
        break;
      }
    }
  }

  getAvailableSpotPairs(exchange: Exchange): Promise<IPairResult[]> {
    switch (exchange.name) {
      case ExchangesEnum.FTX: {
        return this.ftxApiRepository.getAvailableSpotPairs();
      }
      case ExchangesEnum.BINANCE: {
        return this.binanceApiRepository.getAvailableSpotPairs();
      }
      default: {
        break;
      }
    }
  }
}

export { ExchangeApiRepository };
