import { CssBaseline, ThemeOptions } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { frFR } from "@mui/x-data-grid";

import Routes from "./navigation/Routes";
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

  const muiTheme = createTheme(
    appTheme.isDarkMode ? darkTheme : lightTheme,
    frFR // TODO : à adapter au changement de langue
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
