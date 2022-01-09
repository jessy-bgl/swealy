import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "react-query";

import "./index.css";
import "./i18n/i18n.js";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider as AppThemeProvider } from "./services/stores/theme/ThemeProvider";

const queryClient = new QueryClient();
queryClient.setDefaultOptions({
  queries: { refetchOnWindowFocus: false },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppThemeProvider>
          <SnackbarProvider maxSnack={1}>
            <App />
          </SnackbarProvider>
        </AppThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
