enum HttpMethodsEnum {
  'GET' = 'GET',
  'POST' = 'POST',
}

interface IMarketsResult {
  name: string;
  type: string;
  price: number;
  priceIncrement: number;
  sizeIncrement: number;
}

export type { IMarketsResult };
export { HttpMethodsEnum };
