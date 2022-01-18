import { Button, Grid, TextField } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Dca, UpdateDcaDTO } from "../../models/Dca";
import { useUpdateDca } from "./hooks/useDcaQueries";
import { useUpdateDcaForm } from "./hooks/useUpdateDcaForm";

type Props = {
  data?: Dca;
};

const editableFieldNames = ["frequencyInDays", "hour", "amount"];

const DcaInfo = ({ data }: Props) => {
  const { t } = useTranslation("dca");

  const { handleSubmit, errors, isDirty, register, reset } = useUpdateDcaForm();

  useEffect(() => {
    if (data) {
      const { frequencyInDays, hour, amount } = data;
      reset({ frequencyInDays, hour, amount });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const updateDcaQuery = useUpdateDca();

  const onSubmit = handleSubmit((values: UpdateDcaDTO) => {
    if (data) updateDcaQuery.mutate({ ...values, id: data.id });
  });

  return (
    <form onSubmit={onSubmit}>
      <Grid
        container
        direction="column"
        alignItems={"center"}
        spacing={2}
        sx={{ padding: 2 }}
      >
        <Grid item>
          <TextField
            disabled
            value={data ? data.exchange.name.toUpperCase() : ""}
            label={t("form.exchange")}
            size="small"
          />
        </Grid>
        <Grid item>
          <TextField
            disabled
            value={data ? data.pair : ""}
            label={t("form.pair")}
            size="small"
          />
        </Grid>
        <Grid item>
          <TextField
            disabled
            value={t(`status.${data?.status}`)}
            label={t("form.status")}
            size="small"
          />
        </Grid>
        {editableFieldNames.map((fieldName) => (
          <Grid item key={fieldName}>
            <TextField
              {...register(fieldName)}
              defaultValue={data ? data[fieldName] : null}
              label={t(`form.${fieldName}`)}
              type="number"
              helperText={errors[fieldName]?.message}
              error={errors[fieldName] ? true : false}
              size="small"
            />
          </Grid>
        ))}
        <Grid item>
          <Button
            type="submit"
            size="small"
            variant="outlined"
            disabled={!isDirty || updateDcaQuery.isLoading}
          >
            {t("form.update")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export { DcaInfo };
