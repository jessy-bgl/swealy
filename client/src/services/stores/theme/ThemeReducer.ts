import { ITheme, Themes } from "./ThemeContext";
import { initialTheme } from "../../../config/theme";

enum ThemeActionTypes {
  SET_LIGHT_MODE = "set_light_mode",
  SET_DARK_MODE = "set_dark_mode",
}

interface IDarkMode {
  type: ThemeActionTypes;
}

interface ILightMode {
  type: ThemeActionTypes;
}

type ThemeAction = IDarkMode | ILightMode;

const initializer = (initialValue = initialTheme) =>
  localStorage.getItem("theme")
    ? JSON.parse(localStorage.getItem("theme") || "")
    : initialValue;

const ThemeReducer = (state: ITheme, action: ThemeAction): ITheme => {
  switch (action.type) {
    case ThemeActionTypes.SET_LIGHT_MODE:
      return { mode: Themes.LIGHT_MODE };
    case ThemeActionTypes.SET_DARK_MODE:
      return { mode: Themes.DARK_MODE };
    default:
      return state;
  }
};

export type { ThemeAction };
export { ThemeReducer, initializer, ThemeActionTypes };
