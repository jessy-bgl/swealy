import { Dca } from '../models/dca';
import { Exchange } from '../models/exchange';
import { IOrderResult, IPairsResult } from './types';

interface IExchangeApiRepository {
  checkApiKeyValidity(exchange: Exchange): Promise<boolean>;

  createSpotOrder(dca: Dca): Promise<IOrderResult>;

  getAvailableSpotPairs(exchange: Exchange): Promise<IPairsResult[]>;

  // TODO : getAvailableSpotFunds
}

export { IExchangeApiRepository };
