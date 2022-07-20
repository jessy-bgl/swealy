import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

import { Bots } from "../dca-bots/Bots";
import { useInactiveDcaBots } from "./hooks/useInactiveDcaBots";

const InactiveDcaBots = () => {
  const { t } = useTranslation("dca");

  const { pausedBots, archivedBots, isLoading } = useInactiveDcaBots();

  if (isLoading) return <div />;

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={7}>
        <Bots
          data={pausedBots}
          showAddDca={false}
          title={t(`status.pausedBots`)}
        />
      </Grid>

      <Grid item xs={12} md={7}>
        <Bots
          data={archivedBots}
          showAddDca={false}
          title={t(`status.archivedBots`)}
        />
      </Grid>
    </Grid>
  );
};

export { InactiveDcaBots };
