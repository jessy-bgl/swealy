import { Exchange } from './exchange';

class Dca {
  id: string;
  isActive: boolean;
  exchange: Exchange;
  pair: string;
  frequencyInDays: number;
  hour: number;
  amount: number;
}

export { Dca };
