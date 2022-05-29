import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Grid } from "@mui/material";
import GoBackIcon from "@mui/icons-material/ArrowBack";

import { useFetchOneDca } from "../../hooks/useDcaQueries";
import { BotInfo } from "./BotInfo";
import { BotStatistics } from "./BotStatistics";

const Bot = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const { id } = useParams();
  const fetchDcaQuery = useFetchOneDca(id);

  if (fetchDcaQuery.isLoading || !fetchDcaQuery.data) return <div />;

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Button
          size="small"
          startIcon={<GoBackIcon />}
          onClick={() => navigate(-1)}
        >
          {t("goBack")}
        </Button>
      </Grid>

      <Grid item>
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} md={8}>
            <BotStatistics />
          </Grid>
          <Grid item xs={12} md={4}>
            <BotInfo data={fetchDcaQuery.data} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { Bot };
