import { Grid, TextField, MenuItem, Button } from "@mui/material";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Exchange } from "../../../models/Exchange";
import { useCreateBotFirstForm } from "../hooks/useCreateBotForm";

type Props = {
  exchanges: Exchange[];
  onSubmit: any;
  defaultValues: { exchange: string };
};

const FirstForm = ({ exchanges, onSubmit, defaultValues }: Props) => {
  const { t } = useTranslation("dca");

  const { handleSubmit, control } = useCreateBotFirstForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={2}
        sx={{ marginTop: 0 }}
      >
        <Grid item>
          <Controller
            control={control}
            name="exchange"
            defaultValue={defaultValues.exchange || ""}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                fullWidth
                select
                label={t("form.exchange")}
                value={value}
                onChange={onChange}
                helperText={error?.message}
                error={error ? true : false}
                sx={{ minWidth: 275 }}
              >
                {exchanges.map((exchange) => (
                  <MenuItem key={exchange.id} value={exchange.id}>
                    {exchange.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item>
          <Button type="submit">{t("form.next")}</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export { FirstForm };
