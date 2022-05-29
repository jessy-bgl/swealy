import {
  Button,
  Grid,
  TextField,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import ActivateIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ArchiveIcon from "@mui/icons-material/Archive";

import { Dca, DcaStatusEnum, UpdateDcaDTO } from "../../models/Dca";
import { useUpdateDca, useUpdateDcaStatus } from "../../hooks/useDcaQueries";
import { useUpdateBotForm } from "./hooks/useUpdateBotForm";

type Props = {
  data: Dca;
};

type BotActionButton = {
  color: any;
  icon: any;
  label: string;
  onClick: () => void;
};

const editableFieldNames = ["frequencyInDays", "hour", "amount"];

const BotInfo = ({ data }: Props) => {
  const { t } = useTranslation("dca");

  const { handleSubmit, errors, isDirty, register, reset } = useUpdateBotForm();

  useEffect(() => {
    if (data) {
      const { frequencyInDays, hour, amount } = data;
      reset({ frequencyInDays, hour, amount });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const updateDcaQuery = useUpdateDca();
  const updateDcaStatusQuery = useUpdateDcaStatus();

  const onSubmit = handleSubmit((values: UpdateDcaDTO) => {
    if (data) updateDcaQuery.mutate({ ...values, id: data.id });
  });

  const handleClickUpdateStatus = (status: DcaStatusEnum) => {
    if (data) updateDcaStatusQuery.mutate({ id: data.id, status });
  };

  const getDcaActions = (): BotActionButton[] => {
    if (data?.status === DcaStatusEnum.ACTIVE)
      return [
        {
          color: "info",
          icon: <PauseIcon />,
          label: t("action.pause"),
          onClick: () => handleClickUpdateStatus(DcaStatusEnum.PAUSED),
        },
        {
          color: "warning",
          icon: <ArchiveIcon />,
          label: t("action.archive"),
          onClick: () => handleClickUpdateStatus(DcaStatusEnum.ARCHIVED),
        },
      ];
    else if (data?.status === DcaStatusEnum.PAUSED)
      return [
        {
          color: "primary",
          icon: <ActivateIcon />,
          label: t("action.activate"),
          onClick: () => handleClickUpdateStatus(DcaStatusEnum.ACTIVE),
        },
        {
          color: "warning",
          icon: <ArchiveIcon />,
          label: t("action.archive"),
          onClick: () => handleClickUpdateStatus(DcaStatusEnum.ARCHIVED),
        },
      ];
    else if (data?.status === DcaStatusEnum.ARCHIVED)
      return [
        {
          color: "primary",
          icon: <ActivateIcon />,
          label: t("action.activate"),
          onClick: () => handleClickUpdateStatus(DcaStatusEnum.ACTIVE),
        },
        {
          color: "info",
          icon: <PauseIcon />,
          label: t("action.pause"),
          onClick: () => handleClickUpdateStatus(DcaStatusEnum.PAUSED),
        },
      ];
    else return [];
  };

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <CardHeader
          subheader={<Typography align="center">{t("info")}</Typography>}
        />
        <CardContent>
          <Grid container direction="column" alignItems={"center"} spacing={2}>
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
                  {...register(fieldName as keyof UpdateDcaDTO)}
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
            <Grid item>
              <Grid container spacing={1} justifyContent="center">
                {getDcaActions().map((dcaAction) => (
                  <Grid item key={dcaAction.label}>
                    <Button
                      size="small"
                      color={dcaAction.color}
                      variant="outlined"
                      endIcon={dcaAction.icon}
                      onClick={dcaAction.onClick}
                      disabled={updateDcaStatusQuery.isLoading}
                    >
                      {dcaAction.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
};

export { BotInfo };
