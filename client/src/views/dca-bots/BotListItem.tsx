import { useContext } from "react";
import { Grid, Typography, ListItemButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import * as locale from "date-fns/locale";

import { Dca } from "../../models/Dca";
import { getExchangeLogo } from "../../utils/exchange";
import { LanguageContext } from "../../services/stores/language/LanguageContext";
import { useBotConfig } from "../../utils/useBotConfig";

type Props = {
  data: Dca;
  onClick: () => void;
};

const BotListItem = ({ data, onClick }: Props) => {
  const { t } = useTranslation("dca");

  const { language } = useContext(LanguageContext);
  const { botConfigSummary } = useBotConfig(data);

  const showNextTransactionDate = (): string => {
    if (!data.nextTransactionDatetime) return t("noNextTransaction");
    const date = new Date(data.nextTransactionDatetime);
    const formattedDate = format(date, "P", {
      locale: language === "fr" ? locale.fr : locale.enGB,
    });
    return t("nextTransaction", {
      date: formattedDate,
      heure: `${date.getHours()}h`,
    });
  };

  return (
    <ListItemButton
      key={data.id}
      divider
      sx={{ padding: 1.5 }}
      onClick={onClick}
    >
      <Grid container justifyContent="space-between" spacing={0.4}>
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
          <Typography variant="body2">{botConfigSummary}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="primary">
            {showNextTransactionDate()}
          </Typography>
        </Grid>
      </Grid>
    </ListItemButton>
  );
};

export { BotListItem };
