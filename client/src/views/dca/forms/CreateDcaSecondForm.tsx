import { Grid, TextField, MenuItem, Button, Skeleton } from "@mui/material";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useCreateDcaSecondForm } from "./hooks/useCreateDcaForm";
import { useFetchExchangePairs } from "../hooks/useDcaQueries";

type Props = {
  exchangeId: string;
  onSubmit: any;
  onClickPrevious: () => void;
  defaultValues: { pair: string };
};

const FIELD_WIDTH = 275;

const SecondForm = ({
  exchangeId,
  onSubmit,
  defaultValues,
  onClickPrevious,
}: Props) => {
  const { t } = useTranslation("dca");

  const { handleSubmit, control } = useCreateDcaSecondForm();

  const { data, isLoading } = useFetchExchangePairs(exchangeId);

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
          {isLoading ? (
            <Skeleton width={FIELD_WIDTH} height={30} />
          ) : (
            <Controller
              control={control}
              name="pair"
              defaultValue={defaultValues.pair || ""}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  select
                  label={t("form.pair")}
                  value={value}
                  onChange={onChange}
                  helperText={error?.message}
                  error={error ? true : false}
                  sx={{ minWidth: FIELD_WIDTH }}
                >
                  {data?.map((pair) => (
                    <MenuItem key={pair.name} value={pair.name}>
                      {pair.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          )}
        </Grid>
        <Grid item>
          <Grid container spacing={1} justifyContent="center">
            <Grid item>
              <Button onClick={onClickPrevious}>{t("form.previous")}</Button>
            </Grid>
            <Grid item>
              <Button type="submit">{t("form.next")}</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export { SecondForm };
