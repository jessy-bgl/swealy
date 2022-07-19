type ICoingeckoCoinsList = [
  {
    id: string;
    symbol: string;
    name: string;
  },
];

type ICoingeckoCoinsPrice = {
  [id: string]: ICoingeckoCoinPrice;
};

type ICoingeckoCoinPrice = {
  [currency: string]: number;
};

export type { ICoingeckoCoinsList, ICoingeckoCoinsPrice };
