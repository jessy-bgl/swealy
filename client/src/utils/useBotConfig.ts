import { useTranslation } from "react-i18next";

import { Dca } from "../models/Dca";

const useBotConfig = (data: Dca) => {
  const { t } = useTranslation("dca");

  const paiSplitted = data.pair.split("/");
  const cryptoToUse = paiSplitted[1];
  const cryptoToBuy = paiSplitted[0];
  const days = data.frequencyInDays;
  const hour = data.hour;
  const quantity = data.amount;
  const botConfigSummary = t("summary", {
    quantity,
    cryptoToUse,
    cryptoToBuy,
    days,
    hour,
  });

  return { botConfigSummary };
};

export { useBotConfig };
