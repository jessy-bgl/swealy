import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { QueryClientProvider } from "react-query";
import "simplebar/dist/simplebar.min.css";

import "./index.css";
import "./i18n/i18n.js";
import App from "./App";
import { ThemeProvider as AppThemeProvider } from "./services/stores/theme/ThemeProvider";
import { LanguageProvider } from "./services/stores/language/LanguageProvider";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { queryClient } from "./config/react-query";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <AppThemeProvider>
            <SnackbarProvider maxSnack={1}>
              <App />
            </SnackbarProvider>
          </AppThemeProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
