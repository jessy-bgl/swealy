import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Grid, Paper } from "@mui/material";
import GoBackIcon from "@mui/icons-material/ArrowBack";

import { useBot } from "./hooks/useBot";
import { useFetchOneDca } from "../../hooks/useDcaQueries";
import { BotTransactionsSummary } from "./BotTransactionsSummary";
import { BotInfoDialog } from "./BotInfoDialog";
import { BotInfo } from "./BotInfo";
import { BotTransactionsChart } from "./BotTransactionsChart";

const Bot = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchDcaQuery = useFetchOneDca(id);
  const { openBotDialog, handleOpenBotDialog, handleCloseBotDialog } = useBot();

  if (fetchDcaQuery.isLoading || !fetchDcaQuery.data) return <div />;

  // TODO : show an error message
  if (!id) return <div />;

  return (
    <>
      <Grid container direction="column" spacing={2}>
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
          <Paper sx={{ p: 1 }}>
            <BotInfo
              data={fetchDcaQuery.data}
              onClickEdit={handleOpenBotDialog}
            />
          </Paper>
        </Grid>

        <Grid item>
          <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={12} md={4}>
              <BotTransactionsSummary dcaId={id} />
            </Grid>
            <Grid item xs={12} md={8}>
              <BotTransactionsChart />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {openBotDialog && (
        <BotInfoDialog
          onClose={handleCloseBotDialog}
          data={fetchDcaQuery.data}
        />
      )}
    </>
  );
};

export { Bot };
