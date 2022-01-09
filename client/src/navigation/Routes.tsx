import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";

import Navigation from "../views/navigation/Navigation";

function Router() {
  const { t } = useTranslation("navigation");

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigation child={<div />} title={t("dashboard")} />}
      ></Route>
    </Routes>
  );
}

export default Router;
