import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { IExchangeApiRepository } from '../../../domain/repositories/exchange-api.repository';

const baseUrl = 'https://api.binance.com';

@Injectable()
class BinanceApiRepository implements IExchangeApiRepository {
  private httpService: HttpService;

  checkApiKeyValidity(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  createSpotOrder(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getAvailableSpotPairs(): Promise<string[]> {
    throw new Error('Method not implemented.');
  }
}

export { BinanceApiRepository };
