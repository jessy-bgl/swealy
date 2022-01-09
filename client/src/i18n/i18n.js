import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import commonFR from "./fr/common.json";
import navigationFR from "./fr/navigation.json";

export const defaultNS = "common";

export const resources = {
  fr: {
    common: commonFR,
    navigation: navigationFR,
  },
};

i18n.use(initReactI18next).init({
  lng: "fr",
  ns: ["common", "navigation"],
  defaultNS,
  resources,
});
