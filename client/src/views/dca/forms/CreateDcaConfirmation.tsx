import {
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import AmountIcon from "@mui/icons-material/AttachMoney";
import PairIcon from "@mui/icons-material/Paid";
import ExchangeIcon from "@mui/icons-material/AccountBalance";
import FrequencyIcon from "@mui/icons-material/AccessTime";

import { CreateDcaDTO } from "../../../models/Dca";
import { Exchange } from "../../../models/Exchange";

type Props = {
  exchanges: Exchange[];
  onSubmit: any;
  onClickPrevious: () => void;
  data: CreateDcaDTO;
};

const DcaConfirmation = ({
  exchanges,
  onSubmit,
  data,
  onClickPrevious,
}: Props) => {
  const { t } = useTranslation("dca");

  const items = [
    {
      value: exchanges.find((exchange) => exchange.id === data.exchange)?.label,
      label: t("form.exchange"),
      icon: <ExchangeIcon />,
    },
    { value: data.pair, label: t("form.pair"), icon: <PairIcon /> },
    {
      value: `${data.amount} ${data.pair.split("/")[1]}`,
      label: t("form.amount"),
      icon: <AmountIcon />,
    },
    {
      label: t("form.frequency"),
      value: t("form.frequencySummary", {
        days: data.frequencyInDays,
        hour: data.hour,
      }),
      icon: <FrequencyIcon />,
    },
  ];

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <List dense>
          {items.map((item, index) => (
            <ListItem divider key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.value} secondary={item.label} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item>
        <Grid container spacing={1} justifyContent="center">
          <Grid item>
            <Button onClick={onClickPrevious}>{t("form.previous")}</Button>
          </Grid>
          <Grid item>
            <Button onClick={onSubmit}>{t("form.confirm")}</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { DcaConfirmation };
