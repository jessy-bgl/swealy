enum ExchangeEnum {
  'BINANCE' = 'binance',
  'FTX' = 'ftx',
}

class Exchange {
  id: string;
  name: ExchangeEnum;
  label: string;
  apiKey: string;
  apiSecret: string;
  subaccountName?: string;
}

export { Exchange, ExchangeEnum };
