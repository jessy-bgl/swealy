import { useEffect, useReducer } from "react";
import { ThemeContext } from "./ThemeContext";
import { ThemeReducer, initializer } from "./ThemeReducer";

function useProvideTheme() {
  const [theme, setTheme] = useReducer(ThemeReducer, undefined, initializer);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return { theme, setTheme };
}

function ThemeProvider({ children }) {
  const themeValue = useProvideTheme();

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
}

export { ThemeProvider };
