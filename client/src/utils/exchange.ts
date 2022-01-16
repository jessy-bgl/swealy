import { ExchangesEnum } from "../models/Exchange";
import FtxLogo from "../assets/exchanges/ftx.svg";

const getExchangeLogo = (exhangeName: ExchangesEnum) => {
  switch (exhangeName) {
    case ExchangesEnum.FTX: {
      return FtxLogo;
    }
    default: {
      return undefined;
    }
  }
};

export { getExchangeLogo };
