import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";

import { Navigation } from "../views/navigation/Navigation";
import { Exchanges } from "../views/exchanges/Exchanges";
import { Settings } from "../views/settings/Settings";
import { Dcas } from "../views/dca/Dcas";
import { DcaStatusEnum } from "../models/Dca";

function Router() {
  const { t } = useTranslation("navigation");

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigation child={<div />} title={t("dashboard")} />}
      />
      <Route
        path="/dca/active"
        element={
          <Navigation
            child={<Dcas dcaStatus={DcaStatusEnum.ACTIVE} />}
            title={t("activeDcas")}
          />
        }
      />
      <Route
        path="/dca/paused"
        element={
          <Navigation
            child={<Dcas dcaStatus={DcaStatusEnum.PAUSED} />}
            title={t("pausedDcas")}
          />
        }
      />
      <Route
        path="/dca/archived"
        element={
          <Navigation
            child={<Dcas dcaStatus={DcaStatusEnum.ARCHIVED} />}
            title={t("archivedDcas")}
          />
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
    </Routes>
  );
}

export default Router;
