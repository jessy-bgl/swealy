import { Exchange } from './exchange';

enum DcaStatusEnum {
  ACTIVE = 'active',
  PAUSED = 'paused',
  ARCHIVED = 'archived',
}

class Dca {
  id: string;
  status: DcaStatusEnum;
  exchange: Exchange;
  pair: string;
  frequencyInDays: number;
  hour: number;
  amount: number;
  successfulTransactionsCounter: number;
}

export { Dca, DcaStatusEnum };
