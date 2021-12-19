import { Exchange } from '../entities/exchange.entity';

enum OrderTypesEnum {
  LIMIT = 'limit',
  MARKET = 'market',
}

interface IExchangeApiRepository {
  checkApiKeyValidity(exchange: Exchange): Promise<boolean>;

  createSpotOrder(
    exchange: Exchange,
    type: OrderTypesEnum,
    market: string,
    price: number,
  ): Promise<void>;

  // TODO : create a standard type to replace the 'any' type
  getAvailableSpotMarkets(exchange: Exchange): Promise<any[]>;
}

export { IExchangeApiRepository, OrderTypesEnum };
