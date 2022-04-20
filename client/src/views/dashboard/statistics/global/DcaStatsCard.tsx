import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import DcaIcon from "@mui/icons-material/SmartToy";

import { DcaGlobalStats } from "../../../../models/Statistics";

type Props = {
  data: DcaGlobalStats;
  activeDcas: boolean;
};

const DcaGlobalStatsCard = ({ data, activeDcas }: Props) => {
  const { t } = useTranslation(["dca"]);

  return (
    <Card>
      <CardContent sx={{ padding: 1, paddingBottom: "0 !important" }}>
        <Grid
          container
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <DcaIcon
              fontSize="large"
              color={activeDcas ? "success" : "warning"}
            />
          </Grid>
          <Grid item>
            <Typography>
              {activeDcas ? data.active : data.paused}/{data.total}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions>
        {activeDcas
          ? t("dca:stats.activeDcaCounter")
          : t("dca:stats.inactiveDcaCounter")}
      </CardActions>
    </Card>
  );
};

export { DcaGlobalStatsCard };
