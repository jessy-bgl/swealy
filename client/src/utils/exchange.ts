import { ExchangesEnum } from "../models/Exchange";

import FtxLogo from "../assets/exchanges/ftx.svg";
import BinanceLogo from "../assets/exchanges/binance.svg";

const getExchangeLogo = (exhangeName: ExchangesEnum) => {
  switch (exhangeName) {
    case ExchangesEnum.FTX: {
      return FtxLogo;
    }
    case ExchangesEnum.BINANCE: {
      return BinanceLogo;
    }
    default: {
      return undefined;
    }
  }
};

export { getExchangeLogo };
