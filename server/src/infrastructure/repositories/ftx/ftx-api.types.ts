interface IFtxAuthHttpHeaders {
  'FTX-TS': string;
  'FTX-KEY': string;
  'FTX-SIGN': string;
  'FTX-SUBACCOUNT': string;
}

interface IFtxApiResponse<T> {
  success: boolean;
  result: T;
}

export type { IFtxApiResponse, IFtxAuthHttpHeaders };
