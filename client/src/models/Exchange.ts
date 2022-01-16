enum ExchangesEnum {
  // BINANCE = "binance",
  FTX = "ftx",
}

interface Exchange {
  id: string;
  name: ExchangesEnum;
  label: string;
  apiKey: string;
  apiSecret: string;
  subaccountName?: string;
}

interface CreateExchangeDTO {
  name: ExchangesEnum;
  label: string;
  apiKey: string;
  apiSecret: string;
  subaccountName?: string;
}

interface UpdateExchangeDTO {
  id: string;
  label?: string;
  apiKey?: string;
  apiSecret?: string;
  subaccountName?: string;
}

export { ExchangesEnum };
export type { Exchange, CreateExchangeDTO, UpdateExchangeDTO };
