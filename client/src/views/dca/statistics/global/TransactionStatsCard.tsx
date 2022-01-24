import {
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  CardActions,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import TransactionIcon from "@mui/icons-material/Paid";

import { TransactionGlobalStats } from "../../../../models/Statistics";

type Props = {
  data: TransactionGlobalStats;
  success: boolean;
};

const TransactionGlobalStatsCard = ({ data, success }: Props) => {
  const { t } = useTranslation(["transaction"]);

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
            <TransactionIcon
              fontSize="large"
              color={success ? "success" : "error"}
            />
          </Grid>
          <Grid item>
            <Typography>
              {success ? data.success : data.fail}/{data.total}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions>
        {success
          ? t("transaction:stats.successTransactionCounter")
          : t("transaction:stats.failTransactionCounter")}
      </CardActions>
    </Card>
  );
};

export { TransactionGlobalStatsCard };
