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

interface GlobalStats {
  dca: DcaGlobalStats;
  transaction: TransactionGlobalStats;
  currencies: CurrenciesGlobalStats;
}

export type {
  GlobalStats,
  TransactionGlobalStats,
  DcaGlobalStats,
  CurrenciesGlobalStats,
};
