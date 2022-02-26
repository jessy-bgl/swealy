import {
  OrderSidesEnum,
  OrderTypesEnum,
} from '../../../domain/models/transaction';

interface IBinanceAuthHttpHeaders {
  'X-MBX-APIKEY': string;
}

interface IBinanceAuthHttpParams {
  timestamp: string;
  signature: string;
}

interface IBinancePairResult {
  symbol: string; // ex. "BTCUSDT"
  status: string; // ex. "TRADING"
  baseAsset: string; // ex. ETH
  baseAssetPrecision: number; // ex. 8
  quoteAsset: string; // ex. BTC
  quotePrecision: number; // ex. 8
  quoteAssetPrecision: number; // ex. 8
  orderTypes: [OrderTypesEnum];
  icebergAllowed: boolean;
  ocoAllowed: boolean;
  isSpotTradingAllowed: boolean;
  isMarginTradingAllowed: boolean;
  //   filters: [];
  //   permissions: ['SPOT', 'MARGIN'];
}

interface IBinanceExchangeInfoResult {
  symbols: IBinancePairResult[];
  // see more on https://binance-docs.github.io/apidocs/spot/en/#exchange-information
}

enum BinanceOrderResponseTypesEnum {
  ACK = 'ACK',
  RESULT = 'RESULT',
  FULL = 'FULL',
}

interface IBinanceApiPlaceOrderParams {
  symbol: string;
  side: OrderSidesEnum;
  type: OrderTypesEnum;
  quoteOrderQty: number;
  newOrderRespType: BinanceOrderResponseTypesEnum;
}

interface IBinanceApiPlacerOrderResult {
  symbol: string;
  orderId: number;
  orderListId: number; //Unless OCO, value will be -1
  clientOrderId: string;
  transactTime: number;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: string;
  timeInForce: string;
  type: OrderTypesEnum;
  side: OrderSidesEnum;
  fills: { price: string }[];
  // see more on https://binance-docs.github.io/apidocs/spot/en/#new-order-trade
}

export type {
  IBinanceAuthHttpHeaders,
  IBinanceAuthHttpParams,
  IBinanceApiPlaceOrderParams,
  IBinanceApiPlacerOrderResult,
  IBinanceExchangeInfoResult,
};
export { BinanceOrderResponseTypesEnum };
