import { useContext } from "react";
import { ThemeContext, Themes } from "./ThemeContext";
import { ThemeActionTypes } from "./ThemeReducer";

const useThemeContext = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const isDarkMode = theme.mode === Themes.DARK_MODE;

  const toggleMode = () =>
    setTheme({
      type: isDarkMode
        ? ThemeActionTypes.SET_LIGHT_MODE
        : ThemeActionTypes.SET_DARK_MODE,
    });

  return { isDarkMode, toggleMode };
};

export { useThemeContext };
