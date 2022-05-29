import { Grid, TextField, Button, Skeleton, Autocomplete } from "@mui/material";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useCreateBotSecondForm } from "../hooks/useCreateBotForm";
import { useFetchExchangePairs } from "../../../hooks/useDcaQueries";

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

  const { handleSubmit, control, inputValue, setInputValue } =
    useCreateBotSecondForm();

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
                <Autocomplete
                  value={value ? value : null}
                  onChange={(event, newInputValue) => onChange(newInputValue)}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  options={data?.map((pair) => pair.name) || []}
                  sx={{ minWidth: FIELD_WIDTH }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t("form.pair")}
                      helperText={error?.message}
                      error={error ? true : false}
                    />
                  )}
                />
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
