import { Grid, TextField, Button } from "@mui/material";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { UpdateDcaDTO } from "../../../models/Dca";
import { useCreateBotThirdForm } from "../hooks/useCreateBotForm";

type Props = {
  onSubmit: any;
  onClickPrevious: () => void;
  defaultValues: { frequencyInDays: number; hour: number; amount: number };
};

const ThirdForm = ({ onSubmit, onClickPrevious, defaultValues }: Props) => {
  const { t } = useTranslation("dca");

  const { handleSubmit, control, fields } = useCreateBotThirdForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={2}
        sx={{ marginTop: 0 }}
      >
        {fields.map((field) => (
          <Grid item key={field.name}>
            <Controller
              control={control}
              name={field.name as keyof UpdateDcaDTO}
              defaultValue={defaultValues[field.name] || 1}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  type="number"
                  label={t(`form.${field.name}`)}
                  value={value}
                  onChange={onChange}
                  helperText={error?.message}
                  error={error ? true : false}
                />
              )}
            />
          </Grid>
        ))}
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

export { ThirdForm };
