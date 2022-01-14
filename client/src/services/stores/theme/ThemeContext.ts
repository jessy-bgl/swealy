import React, { Context, createContext } from "react";
import { ThemeAction } from "./ThemeReducer";

enum Themes {
  DARK_MODE = "dark_mode",
  LIGHT_MODE = "light_mode",
}

interface ITheme {
  mode: Themes;
}

interface IThemeContext {
  theme: ITheme;
  setTheme: React.Dispatch<ThemeAction>;
}

const ThemeContext: Context<IThemeContext> = createContext({} as IThemeContext);

export type { IThemeContext, ITheme };
export { ThemeContext, Themes };
