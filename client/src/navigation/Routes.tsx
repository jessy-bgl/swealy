import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";

import { Navigation } from "../views/navigation/Navigation";
import { Exchanges } from "../views/exchanges/Exchanges";
import { Settings } from "../views/settings/Settings";
import { Transactions } from "../views/transactions/Transactions";
import { Dashboard } from "../views/dashboard/Dashboard";
import { About } from "../views/about/About";
import { InactiveDcaBots } from "../views/inactive-dca-bots/InactiveDcaBots";
import { Bot } from "../views/dca-bot/Bot";

function Router() {
  const { t } = useTranslation("navigation");

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigation child={<Dashboard />} title={t("dashboard")} />}
      />
      <Route
        path="/dca/:id"
        element={<Navigation child={<Bot />} title={t("dashboard")} />}
      />
      <Route
        path="/inactive-bots"
        element={
          <Navigation child={<InactiveDcaBots />} title={t("inactiveDcas")} />
        }
      />
      <Route
        path="/transactions"
        element={
          <Navigation child={<Transactions />} title={t("transactions")} />
        }
      />
      <Route
        path="/exchanges"
        element={<Navigation child={<Exchanges />} title={t("exchanges")} />}
      />
      <Route
        path="/settings"
        element={<Navigation child={<Settings />} title={t("settings")} />}
      />
      <Route
        path="/about"
        element={<Navigation child={<About />} title={t("about")} />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default Router;
