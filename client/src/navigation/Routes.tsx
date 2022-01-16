import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";

import { Navigation } from "../views/navigation/Navigation";
import { Exchanges } from "../views/exchanges/Exchanges";
import { Settings } from "../views/settings/Settings";

function Router() {
  const { t } = useTranslation("navigation");

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigation child={<div />} title={t("dashboard")} />}
      />
      <Route
        path="/exchanges"
        element={<Navigation child={<Exchanges />} title={t("exchanges")} />}
      />
      <Route
        path="/settings"
        element={<Navigation child={<Settings />} title={t("settings")} />}
      />
    </Routes>
  );
}

export default Router;
