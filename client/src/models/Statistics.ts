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

type BotTransactionsSummary = {
  totalSize: number;
  avgPrice: number;
  totalInvested: number;
  currentValue: number;
  pnl: number;
  pnlPercentage: number;
};

export type {
  GlobalStats,
  TransactionGlobalStats,
  DcaGlobalStats,
  CurrenciesGlobalStats,
  BotTransactionsSummary,
};
