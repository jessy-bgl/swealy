import {
  Alert,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { useFetchTransactionsSummary } from "./hooks/useBotStatsQueries";

type Props = {
  dcaId: string;
};

const BotTransactionsSummary = ({ dcaId }: Props) => {
  const transactionsSummaryQuery = useFetchTransactionsSummary(dcaId);
  const { t } = useTranslation("dca");
  const { palette } = useTheme();

  if (transactionsSummaryQuery.isError)
    return (
      <Card>
        <CardContent>
          <Alert severity="error" color="error">
            {transactionsSummaryQuery.error.message}
          </Alert>
        </CardContent>
      </Card>
    );

  if (transactionsSummaryQuery.isLoading || !transactionsSummaryQuery.data)
    return <div />;

  const data = transactionsSummaryQuery.data;

  return (
    <Card>
      <CardContent>
        <List>
          <ListItem
            secondaryAction={<ListItemText primary={data?.totalSize} />}
          >
            <ListItemText primary={t("stats.totalSize")} />
          </ListItem>

          <ListItem
            secondaryAction={<ListItemText>{data.avgPrice}</ListItemText>}
          >
            <ListItemText primary={t("stats.avgPrice")} />
          </ListItem>

          <ListItem
            secondaryAction={<ListItemText>{data.totalInvested}</ListItemText>}
          >
            <ListItemText primary={t("stats.totalInvested")} />
          </ListItem>

          <ListItem
            secondaryAction={<ListItemText>{data.currentValue}</ListItemText>}
          >
            <ListItemText primary={t("stats.currentValue")} />
          </ListItem>

          <ListItem
            secondaryAction={
              <ListItemText
                primary={`${data.pnl}`}
                primaryTypographyProps={{
                  color:
                    data.pnl < 0 ? palette.error.main : palette.success.main,
                }}
                secondary={`(${data.pnlPercentage}%)`}
                secondaryTypographyProps={{
                  color:
                    data.pnl < 0 ? palette.error.main : palette.success.main,
                }}
                sx={{ textAlign: "right" }}
              />
            }
          >
            <ListItemText primary={t("stats.pnl")} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export { BotTransactionsSummary };
