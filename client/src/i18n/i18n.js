import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import commonFR from "./fr/common.json";
import navigationFR from "./fr/navigation.json";
import settingsFR from "./fr/settings.json";
import exchangeFR from "./fr/exchange.json";
import dcaFR from "./fr/dca.json";
import transactionFR from "./fr/transaction.json";

import commonEN from "./en/common.json";
import navigationEN from "./en/navigation.json";
import settingsEN from "./en/settings.json";
import exchangeEN from "./en/exchange.json";
import dcaEN from "./en/dca.json";
import transactionEN from "./en/transaction.json";

export const defaultNS = "common";

export const resources = {
  fr: {
    common: commonFR,
    navigation: navigationFR,
    settings: settingsFR,
    exchange: exchangeFR,
    transaction: transactionFR,
    dca: dcaFR,
  },
  en: {
    common: commonEN,
    navigation: navigationEN,
    settings: settingsEN,
    exchange: exchangeEN,
    transaction: transactionEN,
    dca: dcaEN,
  },
};

i18n.use(initReactI18next).init({
  lng: "fr",
  ns: ["common", "navigation", "settings", "exchange", "dca", "transaction"],
  defaultNS,
  resources,
});
