import { Exchange } from '../entities/exchange';

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
    amount: number,
  ): Promise<void>;

  // TODO : create a standard type to replace the 'any' type
  getAvailableSpotPairs(exchange: Exchange): Promise<any[]>;

  // TODO : getAvailableSpotFunds
}

export { IExchangeApiRepository, OrderTypesEnum };
