enum ExchangeEnum {
  'BINANCE' = 'binance',
  'FTX' = 'ftx',
}

class Exchange {
  name: ExchangeEnum;
  label: string;
  apiKey: string;
  apiSecret: string;
  subaccountName?: string;
}

export { Exchange, ExchangeEnum };
