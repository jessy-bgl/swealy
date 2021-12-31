import { Dca } from '../models/dca';
import { Exchange } from '../models/exchange';
import { IOrderResult, IPairResult } from './types';

interface IExchangeApiRepository {
  checkApiKeyValidity(exchange: Exchange): Promise<boolean>;

  createSpotOrder(dca: Dca): Promise<IOrderResult>;

  getAvailableSpotPairs(exchange: Exchange): Promise<IPairResult[]>;

  // TODO : getAvailableSpotFunds
}

export { IExchangeApiRepository };
