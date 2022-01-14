import { Languages } from "./LanguageContext";
import { initialLanguage } from "../../../config/language";

const initializer = (initialValue = initialLanguage) =>
  localStorage.getItem("language")
    ? JSON.parse(localStorage.getItem("language") || "")
    : initialValue;

const LanguageReducer = (state: Languages, action: Languages): Languages => {
  return action || state;
};

export { LanguageReducer, initializer };
