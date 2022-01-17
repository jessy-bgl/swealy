import { useContext } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Collapse,
  Grid,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import * as locale from "date-fns/locale";

import { Dca } from "../../models/Dca";
import { getExchangeLogo } from "../../utils/exchange";
import { LanguageContext } from "../../services/stores/language/LanguageContext";

type Props = {
  data: Dca;
  isSelected: boolean;
  onClickDca: (dcaId: string) => void;
};

const DcaCard = ({ data, isSelected, onClickDca }: Props) => {
  const { t } = useTranslation("dca");

  const { language } = useContext(LanguageContext);

  const showNextTransactionDate = (): string => {
    if (!data.nextTransactionDatetime) return "";
    const date = new Date(data.nextTransactionDatetime);
    const formattedDate = format(date, "P", {
      locale: language === "fr" ? locale.fr : locale.enGB,
    });
    return t("nextTransaction", {
      date: formattedDate,
      heure: `${date.getHours()}h`,
    });
  };

  const showSummary = () => {
    const paiSplitted = data.pair.split("/");
    const cryptoToUse = paiSplitted[1];
    const cryptoToBuy = paiSplitted[0];
    const days = data.frequencyInDays;
    const hour = data.hour;
    const quantity = data.amount;
    return t("summary", { quantity, cryptoToUse, cryptoToBuy, days, hour });
  };

  return (
    <Card raised={isSelected}>
      <CardActionArea sx={{ padding: 1 }} onClick={() => onClickDca(data.id)}>
        <Grid container justifyContent="space-between" spacing={2}>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <img
                  src={getExchangeLogo(data.exchange.name)}
                  alt={data.exchange.label}
                  width="25"
                />
              </Grid>
              <Grid item>
                <Typography>{data.exchange.label}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography component="span">{data.pair}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="primary">
              {showNextTransactionDate()}
            </Typography>
          </Grid>
        </Grid>
      </CardActionArea>
      <Collapse in={isSelected} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" align="center">
            {showSummary()}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export { DcaCard };
