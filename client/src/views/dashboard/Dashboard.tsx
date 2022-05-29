import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";

import { Statistics } from "./statistics/Statistics";
import { Bots } from "../dca-bots/Bots";
import { useDashboard } from "./hooks/useDashboard";

const Dashboard = () => {
  const { t } = useTranslation("dca");

  const { dcas, isLoading } = useDashboard();

  if (isLoading) return <div />;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Statistics />
      </Grid>

      <Grid item xs={12} md={6}>
        <Bots data={dcas} showAddDca={true} title={t("status.active")} />
      </Grid>
    </Grid>
  );
};

export { Dashboard };
