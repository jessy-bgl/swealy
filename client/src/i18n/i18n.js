import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import commonFR from "./fr/common.json";
import navigationFR from "./fr/navigation.json";
import settingsFR from "./fr/settings.json";
import exchangeFR from "./fr/exchange.json";
import dcaFR from "./fr/dca.json";
import settingsEN from "./en/settings.json";

export const defaultNS = "common";

export const resources = {
  fr: {
    common: commonFR,
    navigation: navigationFR,
    settings: settingsFR,
    exchange: exchangeFR,
    dca: dcaFR,
  },
  en: {
    settings: settingsEN,
  },
};

i18n.use(initReactI18next).init({
  lng: "fr",
  ns: ["common", "navigation", "settings", "exchange", "dca"],
  defaultNS,
  resources,
});
