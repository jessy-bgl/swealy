import { Dca } from '../models/dca';
import { Exchange } from '../models/exchange';
import { IOrderResult, IPairResult } from './types';

abstract class IExchangeApiRepository {
  abstract checkApiKeyValidity(exchange: Exchange): Promise<void>;

  abstract createSpotOrder(dca: Dca): Promise<IOrderResult>;

  abstract getAvailableSpotPairs(exchange: Exchange): Promise<IPairResult[]>;

  // TODO : getAvailableSpotFunds
}

export { IExchangeApiRepository };
