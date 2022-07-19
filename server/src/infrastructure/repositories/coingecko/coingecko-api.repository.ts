import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from 'nestjs-http-promise';
import { find } from 'lodash';

import { ICoinRepository } from '../../../domain/repositories/coin.repository.interface';
import {
  ICoingeckoCoinsList,
  ICoingeckoCoinsPrice,
} from './coingecko-api.types';

const COINGECKO_API_BASE_URL = 'https://api.coingecko.com/api/v3';

const handleCoingeckoApiError = (e: any) => {
  if (e.response)
    throw new HttpException(
      {
        status: e.response.status || 500,
        error: `Coingecko API error : ${e.response.data.error}`,
      },
      e.response.status || 500,
    );
  else throw e;
};

@Injectable()
class CoingeckoApiRepository implements ICoinRepository {
  constructor(private readonly httpService: HttpService) {}

  async fetchPrice(symbol: string): Promise<number> {
    const coinId: string = await this.fetchCoinId(symbol);
    const coinPrice: number = await this.fetchCoinPrice(coinId, 'usd');
    return coinPrice;
  }

  private async fetchCoinId(symbol: string): Promise<string> {
    const coinsList: ICoingeckoCoinsList = await this.fetchCoinsList();
    const coin = find(
      coinsList,
      (coin) => coin.symbol === symbol.toLowerCase(),
    );
    if (!coin) throw new Error(`coin not found : ${symbol}`);
    return coin.id;
  }

  private async fetchCoinsList(): Promise<ICoingeckoCoinsList> {
    try {
      const res = await this.httpService.get<ICoingeckoCoinsList>(
        `${COINGECKO_API_BASE_URL}/coins/list`,
      );
      return res.data;
    } catch (e) {
      handleCoingeckoApiError(e);
    }
  }

  private async fetchCoinPrice(
    coinId: string,
    vsCurrency: string,
  ): Promise<number> {
    try {
      const res = await this.httpService.get<ICoingeckoCoinsPrice>(
        `${COINGECKO_API_BASE_URL}/simple/price?ids=${coinId}&vs_currencies=${vsCurrency}`,
      );
      if (!res.data[coinId]) throw new Error(`coin not found : ${coinId}`);
      if (!res.data[coinId][vsCurrency])
        throw new Error(`invalid currency : ${vsCurrency}`);
      return res.data[coinId][vsCurrency];
    } catch (e) {
      handleCoingeckoApiError(e);
    }
  }
}

export { CoingeckoApiRepository };
