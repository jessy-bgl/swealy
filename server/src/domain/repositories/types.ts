enum HttpMethodsEnum {
  'GET' = 'GET',
  'POST' = 'POST',
}

interface IPairsResult {
  name: string;
  type: string;
  price: number;
  priceIncrement: number;
  sizeIncrement: number;
}

export type { IPairsResult };
export { HttpMethodsEnum };
