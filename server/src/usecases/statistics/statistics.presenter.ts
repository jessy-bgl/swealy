import { ApiProperty } from '@nestjs/swagger';

type DcaGlobalStats = {
  total: number;
  active: number;
  paused: number;
  archived: number;
};

type TransactionGlobalStats = {
  total: number;
  success: number;
  fail: number;
  auto: number;
  manual: number;
};

type CurrencyStats = {
  name: string;
  weight: number;
};

type CurrenciesGlobalStats = CurrencyStats[];

class GlobalStatsPresenter {
  @ApiProperty()
  dca: DcaGlobalStats;
  @ApiProperty()
  transaction: TransactionGlobalStats;
  @ApiProperty()
  currencies: CurrenciesGlobalStats;

  constructor(
    dca: DcaGlobalStats,
    transaction: TransactionGlobalStats,
    currencies: CurrenciesGlobalStats,
  ) {
    this.dca = dca;
    this.transaction = transaction;
    this.currencies = currencies;
  }
}

export { GlobalStatsPresenter };
export type { TransactionGlobalStats, DcaGlobalStats, CurrenciesGlobalStats };
