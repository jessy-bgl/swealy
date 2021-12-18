import { Exchange } from '../entities/exchange.entity';

enum OrderTypesEnum {
  LIMIT = 'limit',
  MARKET = 'market',
}

interface IExchangeApiRepository {
  checkApiKeyValidity(exchange: Exchange): Promise<boolean>;

  createSpotOrder(
    type: OrderTypesEnum,
    market: string,
    price: number,
  ): Promise<void>;

  getAvailableSpotMarkets(): Promise<string[]>;
}

export { IExchangeApiRepository, OrderTypesEnum };
