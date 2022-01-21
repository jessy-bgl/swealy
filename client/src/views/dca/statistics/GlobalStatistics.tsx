import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

type Props = {
  dcaCounter: number;
};

const GlobalStatistics = ({ dcaCounter }: Props) => {
  const { t } = useTranslation("dca");

  return (
    <Grid container justifyContent={"center"} sx={{ padding: 1 }}>
      <Grid item xs={9} sm={7}>
        <Grid container justifyContent="space-between" spacing={1}>
          <Grid item>{t("stats.dcaCounter")}</Grid>
          <Grid item>{dcaCounter}</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { GlobalStatistics };
