import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";

import { Navigation } from "../views/navigation/Navigation";
import { Exchanges } from "../views/exchanges/Exchanges";
import { Settings } from "../views/settings/Settings";
import { DcaStatusEnum } from "../models/Dca";
import { Transactions } from "../views/transactions/Transactions";
import { Dashboard } from "../views/dca/Dashboard";
import { About } from "../views/about/About";

function Router() {
  const { t } = useTranslation("navigation");

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigation
            child={<Navigate to="/dca/active" />}
            title={t("dashboard")}
          />
        }
      />
      <Route
        path="/dca/active"
        element={
          <Navigation
            child={<Dashboard dcaStatus={DcaStatusEnum.ACTIVE} />}
            title={t("activeDcas")}
          />
        }
      />
      <Route
        path="/dca/paused"
        element={
          <Navigation
            child={<Dashboard dcaStatus={DcaStatusEnum.PAUSED} />}
            title={t("pausedDcas")}
          />
        }
      />
      <Route
        path="/dca/archived"
        element={
          <Navigation
            child={<Dashboard dcaStatus={DcaStatusEnum.ARCHIVED} />}
            title={t("archivedDcas")}
          />
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
    </Routes>
  );
}

export default Router;
