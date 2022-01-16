enum ExchangesEnum {
  BINANCE = 'binance',
  FTX = 'ftx',
}

class Exchange {
  id: string;
  name: ExchangesEnum;
  label: string;
  apiKey: string;
  apiSecret: string;
  subaccountName?: string;
}

export { Exchange, ExchangesEnum };
