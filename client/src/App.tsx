import { CssBaseline, ThemeOptions } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { frFR, enUS } from "@mui/x-data-grid";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import Routes from "./navigation/Routes";
import {
  LanguageContext,
  Languages,
} from "./services/stores/language/LanguageContext";
import { useThemeContext } from "./services/stores/theme/useThemeContext";

const darkTheme = {
  palette: {
    mode: "dark",
    background: { default: "#151515", paper: "#212121" },
  },
} as ThemeOptions;

const lightTheme = {
  palette: {
    mode: "light",
    background: { default: "#f2f2f2" },
  },
} as ThemeOptions;

function App() {
  const appTheme = useThemeContext();
  const { i18n } = useTranslation();
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    i18n.changeLanguage(`${language}-${language.toUpperCase()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const muiTheme = createTheme(
    appTheme.isDarkMode ? darkTheme : lightTheme,
    language === Languages.FR ? frFR : enUS
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
